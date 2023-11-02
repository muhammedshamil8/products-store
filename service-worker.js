const CACHE_NAME = 'todo-app-cache-v1';
const urlsToCache = [
  '/',
  'styles.css',
  'index.html',
  'index.js',
  'icon.png',
  'offline.html' // Create an offline fallback page
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      // When offline, serve the offline.html page as a fallback
      if (!navigator.onLine) {
        return caches.match('offline.html');
      }

      // If the request is not in the cache and online, fetch it from the network
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return networkResponse;
        });
    })
  );
});
