const CACHE_NAME = 'todo-app-cache-v1';
const urlsToCache = [
  '/',
  'styles.css',
  'index.js',
  'index.js',
  'birdlogo7.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        // If the requested resource is not in cache, fetch it
        return fetch(event.request)
          .then(fetchResponse => {
            // Clone the response to store in the cache
            const clone = fetchResponse.clone();
            
            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, clone);
              });
            
            return fetchResponse;
          });
      })
  );
});