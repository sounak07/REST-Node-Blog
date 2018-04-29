self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open("cache-v1").then(function(cache) {
      return cache.addAll([
        '/',
        '/blogs',
        '/blogs/new',
        '/js/app.js',
        '/stylesheets/app.css',
        'https://use.fontawesome.com/f90313f33f.js',
        'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
      ]);
    })
  );
});


self.addEventListener('fetch', function(event){
   event.respondWith(
      caches.match(event.request).then(function (response) {
        if(response) return response;
        else return fetch(event.request);
    })
  );
});
