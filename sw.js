const CACHE_NAME = 'encriptador-v1';
const assetsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './assets/Logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
