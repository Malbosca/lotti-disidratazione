const CACHE_NAME = 'malbosca-lotti-v1';
const urlsToCache = [
  '/lotti-disidratazione/',
  '/lotti-disidratazione/index.html',
  '/lotti-disidratazione/favicon.ico',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Installazione - caching delle risorse
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Attivazione - pulizia cache vecchie
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia: Network First per API, Cache First per risorse statiche
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // API calls - sempre network first
  if (url.hostname.includes('script.google.com') || 
      url.hostname.includes('workers.dev')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => new Response(
          JSON.stringify({ success: false, offline: true }), 
          { headers: { 'Content-Type': 'application/json' }}
        ))
    );
    return;
  }
  
  // Risorse statiche - cache first
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Salva in cache solo GET e risposte OK
          if (event.request.method === 'GET' && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Fallback offline
        return new Response('<h1>Offline</h1><p>Connessione assente</p>', {
          headers: { 'Content-Type': 'text/html' }
        });
      })
  );
});
