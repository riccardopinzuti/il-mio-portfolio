const CACHE_NAME = 'preventivo-cache-v1.0'; // Incrementa la versione se fai modifiche ai file per forzare l'aggiornamento
const urlsToCache = [
    '/index.html',
    '/', // L'URL di base
    '/manifest.json',
    '/icons/icon-192x192.png', // Assicurati che queste icone esistano
    '/icons/icon-512x512.png', // Assicurati che queste icone esistano
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', event => {
    // Il Service Worker sta per essere installato
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
    // Intercetta tutte le richieste di rete
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se la risorsa è nella cache, restituiscila
                if (response) {
                    return response;
                }
                // Altrimenti, recuperala dalla rete
                return fetch(event.request);
            })
            .catch(error => {
                // Gestione errori di rete/cache
                console.error('[Service Worker] Fetch failed:', error);
                // Potresti voler restituire una pagina offline qui
            })
    );
});

self.addEventListener('activate', event => {
    // Il Service Worker è stato attivato
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        // Elimina le vecchie cache
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('[Service Worker] Activated.');
    self.clients.claim(); // Prende il controllo delle pagine esistenti
});