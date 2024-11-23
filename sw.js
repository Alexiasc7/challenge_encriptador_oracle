const CACHE_NAME = 'encriptador-v1';
const assetsToCache = [
  '/challenge_encriptador_oracle/',
  '/challenge_encriptador_oracle/index.html',
  '/challenge_encriptador_oracle/css/style.css',
  '/challenge_encriptador_oracle/js/script.js',
  '/challenge_encriptador_oracle/assets/Logo-160-192.jpg',
  '/challenge_encriptador_oracle/assets/Logo-427-512.jpg',
  '/challenge_encriptador_oracle/manifest.json'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

