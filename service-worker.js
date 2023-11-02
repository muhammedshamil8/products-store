const CACHE_NAME = 'product-app-cache-v1';
const urlsToCache = [
     '/',
     'styles.css',
     'index.html',
     'index.js',
     'offline.html',
     'icon.png',
   ];
//    self.addEventListener('install', (event) => {
//      event.waitUntil(
//        caches.open(CACHE_NAME)
//          .then((cache) => {
//            return cache.addAll(urlsToCache);
//          })
//      );
//    });
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request)
         .then(response => {
           if (response) {
             return response;
           }
   
           // If the requested resource is not in cache, serve the offline page
           return fetch(event.request)
             .catch(() => caches.match('offline.html')) // Serve offline.html when there's an error
             .then(notFoundResponse => {
               if (notFoundResponse) {
                 return notFoundResponse;
               }
               // If offline.html is also not found in the cache, you can return a simple response
               // with a custom message.
               return new Response('<div style="margin:auto"></div><p>Something fishy...<br />dont reload in offline mode just use it!</p></div>'
              
               , 
               {
                 headers: { 'Content-Type': 'text/html' }
               });
             });
         })
     );
   });
   
