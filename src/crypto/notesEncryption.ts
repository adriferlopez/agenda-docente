/**
 * Cifrado de extremo a extremo de las anotaciones de alumnado (ver
 * StudentsPage.tsx / firebase/studentNotes.ts).
 *
 * El objetivo es que ni Firestore ni quien administre este proyecto de
 * Firebase (ni siquiera el propio desarrollador de la app) pueda leer jamás
 * el contenido de estas notas: todo el cifrado y descifrado ocurre aquí, en
 * el navegador del propio docente, con una clave que nunca sale de él.
 *
 * Diseño (el mismo patrón que usan gestores de contraseñas como Bitwarden
 * o el cifrado de FileVault/BitLocker):
 *
 * - Se genera una "clave de cifrado de datos" (DEK) aleatoria de 256 bits,
 *   con la que se cifran/descifran las notas (AES-256-GCM). Es la única
 *   clave que realmente cifra contenido.
 * - Esa DEK nunca se guarda tal cual en ningún sitio: se guarda "envuelta"
 *   (cifrada) de dos formas independientes, para poder recuperarla de dos
 *   maneras distintas sin que ninguna de ellas dependa de la otra:
 *     1) Envuelta con una clave derivada (PBKDF2) de la frase secreta que
 *        elige el propio docente. Esa frase nunca se envía a ningún sitio.
 *     2) Envuelta con una clave derivada (HKDF) de un código de recuperación
 *        aleatorio que se genera una sola vez, se le muestra al docente para
 *        que lo guarde él mismo, y nunca se guarda en Firestore.
 * - Lo único que llega al servidor son las dos versiones cifradas de la DEK
 *   más un par de valores públicos por diseño (sal e iteraciones de
 *   PBKDF2). Ninguno de esos datos permite reconstruir la frase secreta, el
 *   código de recuperación ni la DEK sin conocer uno de los dos secretos.
 *
 * Todo este módulo usa exclusivamente la Web Crypto API nativa del
 * navegador (crypto.subtle): no hay ninguna librería de terceros de por
 * medio que pudiera filtrar claves o texto en claro.
 */

const AES_ALGO = 'AES-GCM';
const KEY_LENGTH = 256;
const PBKDF2_ITERATIONS = 210_000; // recomendación OWASP 2023 para PBKDF2-SHA256
const IV_LENGTH_BYTES = 12; // longitud recomendada de IV para AES-GCM
const RECOVERY_SECRET_LENGTH_BYTES = 20; // 160 bits, múltiplo exacto de 5 bits (sin relleno al codificar)
const RECOVERY_HKDF_INFO = 'agenda-docente-notes-recovery-v1';

// Alfabeto tipo Base32 sin caracteres ambiguos (0/O, 1/I/L) para que el
// código de recuperación sea fácil de leer, copiar a mano o dictar.
const RECOVERY_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export class WrongNotesKeyError extends Error {
  constructor() {
    super('wrong-notes-key');
    this.name = 'WrongNotesKeyError';
  }
}

export interface NotesEncryptionConfig {
  enabled: boolean;
  passphraseSalt: string;
  passphraseIterations: number;
  wrappedDekByPassphrase: string;
  wrappedDekByPassphraseIv: string;
  wrappedDekByRecovery: string;
  wrappedDekByRecoveryIv: string;
}

export function isWebCryptoAvailable(): boolean {
  return typeof crypto !== 'undefined' && !!crypto.subtle;
}

// --- Utilidades de codificación --------------------------------------

function toBase64(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  return btoa(binary);
}

// Nota TS: se castea explícitamente a Uint8Array<ArrayBuffer> porque, según
// la versión de la lib DOM, el tipo inferido de `new Uint8Array(n)` puede
// ser el más genérico Uint8Array<ArrayBufferLike> (que incluye
// SharedArrayBuffer), no asignable a BufferSource al pasarlo a
// crypto.subtle.*. Los bytes en tiempo de ejecución son idénticos.
function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes as Uint8Array<ArrayBuffer>;
}

function randomBytes(length: number): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(length)) as Uint8Array<ArrayBuffer>;
}

/** Codifica bytes en el alfabeto de recuperación, agrupado en bloques de 4 separados por guiones. */
function encodeRecoveryCode(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += RECOVERY_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += RECOVERY_ALPHABET[(value << (5 - bits)) & 31];
  return output.match(/.{1,4}/g)!.join('-');
}

function decodeRecoveryCode(code: string): Uint8Array<ArrayBuffer> {
  const clean = code.replace(/[-\s]/g, '').toUpperCase().replace(/O/g, '0').replace(/I|L/g, '1');
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (const char of clean) {
    const idx = RECOVERY_ALPHABET.indexOf(char);
    if (idx === -1) throw new WrongNotesKeyError();
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(output) as Uint8Array<ArrayBuffer>;
}

// --- Derivación de claves ----------------------------------------------

async function deriveKeyFromPassphrase(passphrase: string, saltB64: string, iterations: number): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, [
    'deriveKey',
  ]);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromBase64(saltB64), iterations, hash: 'SHA-256' },
    baseKey,
    { name: AES_ALGO, length: KEY_LENGTH },
    false,
    ['wrapKey', 'unwrapKey']
  );
}

async function deriveKeyFromRecoveryCode(code: string): Promise<CryptoKey> {
  const secretBytes = decodeRecoveryCode(code);
  const baseKey = await crypto.subtle.importKey('raw', secretBytes, 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(0) as Uint8Array<ArrayBuffer>,
      info: new TextEncoder().encode(RECOVERY_HKDF_INFO),
    },
    baseKey,
    { name: AES_ALGO, length: KEY_LENGTH },
    false,
    ['wrapKey', 'unwrapKey']
  );
}

async function generateDek(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: AES_ALGO, length: KEY_LENGTH }, true, ['encrypt', 'decrypt']);
}

async function wrapDek(dek: CryptoKey, kek: CryptoKey): Promise<{ ciphertext: string; iv: string }> {
  const iv = randomBytes(IV_LENGTH_BYTES);
  const wrapped = await crypto.subtle.wrapKey('raw', dek, kek, { name: AES_ALGO, iv });
  return { ciphertext: toBase64(wrapped), iv: toBase64(iv) };
}

async function unwrapDek(ciphertextB64: string, ivB64: string, kek: CryptoKey): Promise<CryptoKey> {
  try {
    return await crypto.subtle.unwrapKey(
      'raw',
      fromBase64(ciphertextB64),
      kek,
      { name: AES_ALGO, iv: fromBase64(ivB64) },
      { name: AES_ALGO, length: KEY_LENGTH },
      true,
      ['encrypt', 'decrypt']
    );
  } catch {
    // AES-GCM falla la verificación de integridad si la clave no es la
    // correcta: así es como se detecta una clave/código equivocado, sin
    // necesidad de guardar ningún dato adicional "verificador".
    throw new WrongNotesKeyError();
  }
}

// --- API pública ---------------------------------------------------------

export interface NotesEncryptionSetupResult {
  config: NotesEncryptionConfig;
  /** Código de recuperación en claro: mostrar una sola vez al docente y no guardarlo en ningún sitio propio. */
  recoveryCode: string;
  dek: CryptoKey;
}

/** Activa el cifrado por primera vez: genera la DEK y las dos envolturas (clave propia + código de recuperación). */
export async function setupNotesEncryption(passphrase: string): Promise<NotesEncryptionSetupResult> {
  const dek = await generateDek();

  const passphraseSalt = randomBytes(16);
  const passphraseIterations = PBKDF2_ITERATIONS;
  const kekFromPassphrase = await deriveKeyFromPassphrase(passphrase, toBase64(passphraseSalt), passphraseIterations);
  const wrappedByPassphrase = await wrapDek(dek, kekFromPassphrase);

  const recoveryCode = encodeRecoveryCode(randomBytes(RECOVERY_SECRET_LENGTH_BYTES));
  const kekFromRecovery = await deriveKeyFromRecoveryCode(recoveryCode);
  const wrappedByRecovery = await wrapDek(dek, kekFromRecovery);

  return {
    config: {
      enabled: true,
      passphraseSalt: toBase64(passphraseSalt),
      passphraseIterations,
      wrappedDekByPassphrase: wrappedByPassphrase.ciphertext,
      wrappedDekByPassphraseIv: wrappedByPassphrase.iv,
      wrappedDekByRecovery: wrappedByRecovery.ciphertext,
      wrappedDekByRecoveryIv: wrappedByRecovery.iv,
    },
    recoveryCode,
    dek,
  };
}

/** Desbloquea la DEK con la frase secreta del docente. Lanza WrongNotesKeyError si no es correcta. */
export async function unlockWithPassphrase(passphrase: string, config: NotesEncryptionConfig): Promise<CryptoKey> {
  const kek = await deriveKeyFromPassphrase(passphrase, config.passphraseSalt, config.passphraseIterations);
  return unwrapDek(config.wrappedDekByPassphrase, config.wrappedDekByPassphraseIv, kek);
}

/** Desbloquea la DEK con el código de recuperación. Lanza WrongNotesKeyError si no es correcto. */
export async function unlockWithRecoveryCode(code: string, config: NotesEncryptionConfig): Promise<CryptoKey> {
  const kek = await deriveKeyFromRecoveryCode(code);
  return unwrapDek(config.wrappedDekByRecovery, config.wrappedDekByRecoveryIv, kek);
}

/** Tras recuperar el acceso con el código, permite fijar una frase secreta nueva sin tocar el código de recuperación. */
export async function rewrapWithNewPassphrase(
  dek: CryptoKey,
  newPassphrase: string
): Promise<Pick<NotesEncryptionConfig, 'passphraseSalt' | 'passphraseIterations' | 'wrappedDekByPassphrase' | 'wrappedDekByPassphraseIv'>> {
  const passphraseSalt = randomBytes(16);
  const passphraseIterations = PBKDF2_ITERATIONS;
  const kek = await deriveKeyFromPassphrase(newPassphrase, toBase64(passphraseSalt), passphraseIterations);
  const wrapped = await wrapDek(dek, kek);
  return {
    passphraseSalt: toBase64(passphraseSalt),
    passphraseIterations,
    wrappedDekByPassphrase: wrapped.ciphertext,
    wrappedDekByPassphraseIv: wrapped.iv,
  };
}

export interface EncryptedField {
  ciphertext: string;
  iv: string;
}

export async function encryptNoteField(dek: CryptoKey, plaintext: string): Promise<EncryptedField> {
  const iv = randomBytes(IV_LENGTH_BYTES);
  const ciphertext = await crypto.subtle.encrypt({ name: AES_ALGO, iv }, dek, new TextEncoder().encode(plaintext));
  return { ciphertext: toBase64(ciphertext), iv: toBase64(iv) };
}

export async function decryptNoteField(dek: CryptoKey, field: EncryptedField): Promise<string> {
  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: AES_ALGO, iv: fromBase64(field.iv) },
      dek,
      fromBase64(field.ciphertext)
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    throw new WrongNotesKeyError();
  }
}
