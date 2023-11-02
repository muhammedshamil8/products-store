const CACHE_NAME = 'product-app-cache-v1';
const urlsToCache = [
     '/',
     'styles.css',
     'index.html',
     'index.js',
     'offline.html',
     'icon.png',
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
       Promise.race([
         fetch(event.request)
           .then((response) => {
             // Cache the fetched response for future use
             const responseClone = response.clone();
             caches.open(CACHE_NAME)
               .then((cache) => cache.put(event.request, responseClone));
             return response;
           })
           .catch(() => {
             // Network request failed, try to serve an offline page
             return caches.match('offline.html');
           }),
         new Promise((_, reject) => {
           // Set a timeout for the network request
           setTimeout(() => reject(new Error('Request timed out')), 5000); // Adjust the timeout as needed
         })
       ])
     );
   });
   

//    self.addEventListener('fetch', event => {
//      event.respondWith(
//        caches.match(event.request)
//          .then(response => {
//            if (response) {
//              return response;
//            }
   
//            // If the requested resource is not in cache, serve the offline page
//            return fetch(event.request)
//              .catch(() => caches.match('offline.html')) // Serve offline.html when there's an error
//              .then(notFoundResponse => {
//                if (notFoundResponse) {
//                  return notFoundResponse;
//                }
//                // If offline.html is also not found in the cache, you can return a simple response
//                // with a custom message.
//                return new Response('index.html'
              
//                , 
//                {
//                  headers: { 'Content-Type': 'html/javascript' }
//                });
//              });
//          })
//      );
//    });
   
