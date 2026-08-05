import crypto from 'crypto';

/**
 * Cifrado simétrico AES-256-GCM para la clave de la API de Gemini de cada
 * docente. El secreto maestro (GEMINI_ENCRYPTION_KEY) se configura como
 * "secret" de Cloud Functions (no se guarda en el repositorio) y debe ser
 * una cadena de 32 bytes en base64 o hex, o cualquier cadena que se derive
 * a 32 bytes mediante SHA-256 (lo hacemos así para simplificar el setup).
 *
 * Formato almacenado en Firestore: "<ivHex>:<authTagHex>:<cipherTextHex>"
 */

function getMasterKey(): Buffer {
  const secret = process.env.GEMINI_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('GEMINI_ENCRYPTION_KEY no está configurada en el entorno de la función.');
  }
  // Derivamos siempre a 32 bytes mediante SHA-256, independientemente del
  // formato/longitud del secreto original.
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

export function encryptApiKey(plainText: string): string {
  const key = getMasterKey();
  const iv = crypto.randomBytes(12); // recomendado para GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptApiKey(stored: string): string {
  const key = getMasterKey();
  const [ivHex, authTagHex, cipherHex] = stored.split(':');
  if (!ivHex || !authTagHex || !cipherHex) {
    throw new Error('Formato de clave cifrada inválido.');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const cipherText = Buffer.from(cipherHex, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  return decrypted.toString('utf8');
}
