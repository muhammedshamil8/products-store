const CACHE_NAME = 'todo-app-cache-v1';
const urlsToCache = [
  '/',
  'styles.css',
  'index.html',
  'index.js',
  'icon.png',
  'offline.html' 
];

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Serve cached assets
        }

        // If the request is not in the cache, fetch it from the network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache the API response
            if (event.request.url.startsWith('/api/')) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
            }

            return networkResponse;
          })
          .catch(() => {
            // If both cache and network fail, serve offline page
            return caches.match('offline.html');
          });
      })
  );
});

