const CACHE_NAME = 'preventivo-cache-v1.1'; // Ho incrementato la versione a v1.1
const urlsToCache = [
    '/index.html',
    '/', // L'URL di base
    '/manifest.json',
    '/icons/icon-192x192.png', // Assicurati che queste icone esistano
    '/icons/icon-512x512.png', // Assicurati che queste icone esistano
    'https://cdn.tailwindcss.com'
    // Rimosso 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching all content');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[Service Worker] Cache addAll failed:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(error => {
                console.error('[Service Worker] Fetch failed:', error);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('[Service Worker] Activated.');
    self.clients.claim();
});