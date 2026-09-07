/**
 * Convierte un enlace de "compartir" de Google Drive
 * (p.ej. https://drive.google.com/file/d/FILE_ID/view?usp=sharing) en una
 * URL de vista previa directa, para poder mostrarlo dentro de un <img>. El
 * archivo debe estar compartido como "Cualquier persona con el enlace" para
 * que la miniatura cargue.
 *
 * Si la URL no es de Drive (p.ej. una imagen alojada en otro sitio), se
 * devuelve tal cual: así el campo también acepta enlaces de imagen directos.
 */
export function driveImagePreviewUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  const match = trimmed.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=)([a-zA-Z0-9_-]+)/);
  const id = match?.[1];
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  return trimmed;
}
