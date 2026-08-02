const SW_VERSION = 'v1';
const RUNTIME_CACHE = `ironlog-runtime-${SW_VERSION}`;
const IMAGE_CACHE = `ironlog-images-${SW_VERSION}`;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('ironlog-') && key !== RUNTIME_CACHE && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // ما نتدخل بطلبات التنقل بين الصفحات إطلاقاً — تفادي أي تعارض بالتوجيه
  if (request.mode === 'navigate') return;

  const url = new URL(request.url);

  // صور من Pexels — تتغير نادراً، كاش أول
  if (url.hostname === 'images.pexels.com') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // ملفات نفس الموقع (JS/CSS/الأيقونات) — شبكة أول مع رجوع للكاش بدون نت
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}
