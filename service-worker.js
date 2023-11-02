const CACHE_NAME = 'todo-app-cache-v1';
const urlsToCache = [
  '/',
  'styles.css',
  'index.html',
  'index.js',
  'icon.png',
  'offline.html' 
];
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
            return new Response(`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
            
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>My App</title>
                 <link rel="icon" href="icon.png" type="image/png">
                 <link rel="stylesheet" href="index.css">
                 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                      <link rel="manifest" href="manifest.json">
            
            </head>
            
            <body>
                 <!-- <div class="cardInstall">
                      <span class="input-group-text card-close"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                           height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                           <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg></span>
                      <p>install the app</p>
                      <button id="install-button" class="insta-btn">Install App</button>
            
                 </div> -->
            
                 <section>
                      <div class="head-on">
                           <h1><img class="logo" src="icon.png"> My &nbsp;
                                <span class="head-child">Products</span>
                           </h1>
                           <button class="js-reset-btn reset-btn" onclick="confirmReset();">
                                Reset list
                           </button>
                      </div>
                      <div class="input-group mb-3">
                           <span class="input-group-text input-search-child"><label for="myInput" onclick="searchProducts();" class="input-search-child"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                          height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                          <path
                                               d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                     </svg></label></span>
                           <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" type="text"
                                id="myInput" onkeyup="searchProducts()" placeholder="Search for products.." title="Type in a name">
                           <span class="input-group-text input-search-child" onclick="clearFilter()"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                     height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                     <path
                                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg></span>
                      </div>
            
            
            
                      <div class="todo-input-grid">
                           <input placeholder="Product name" class="js-todo input-name" />
                           <input placeholder="company name" class="js-todo2 input-name" />
                           <button  class="js-add-btn add-btn">Add</button>
                      </div>
            
                      <table id="myTable" class="table table-striped">
                           <thead>
                                <tr>
                                     <th>Product Name</th>
                                     <th>Company Name</th>
                                     <th>Action</th>
                                </tr>
                           </thead>
                           <tbody class="table-body js-todolist-table">
                                <!-- JavaScript will populate the table body -->
                           </tbody>
                      </table>
            
                 </section>
            
                 <script src="index.js"></script>
            
                
            </body>
            
            </html>`
            , 
            {
              headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});

