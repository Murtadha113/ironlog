export function toEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2];
      else id = u.searchParams.get('v');
    } else if (u.hostname === 'youtu.be') {
      id = u.pathname.slice(1);
    }
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  } catch {
    return null;
  }
}
