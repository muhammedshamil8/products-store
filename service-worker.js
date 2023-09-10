// service-worker.js
self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open('my-cache').then((cache) => {
         // Cache multiple files and assets here
         return cache.addAll([
           './index.html',
           './styles.css', // Add paths to your CSS files
           './script.js', // Add paths to your JavaScript files
           './icon.png', // Add paths to your images
           // Add more files and assets as needed
         ]);
       })
     );
   });
   
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         // Serve cached files if available, otherwise fetch from the network
         return response || fetch(event.request);
       })
     );
   });
   