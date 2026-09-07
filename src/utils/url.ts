// Los enlaces del Mural los escribe el propio docente, pero se guardan y se
// abren tal cual (sin pasar por el servidor). Si alguna vez llegase ahí un
// valor con esquema "javascript:" (por ejemplo un enlace copiado de una
// fuente no confiable, o una cuenta comprometida), window.open lo ejecutaría
// como código en el contexto de la página — un XSS clásico vía "javascript:
// URI". Esta función solo deja pasar http/https antes de abrir cualquier
// enlace guardado por el usuario.
export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
