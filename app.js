if (navigator.serviceWorker.controller) {
  console.log("Active service worker found");
  console.log("by mickiDev another one :D");
  } else {
      navigator.serviceWorker
      .register("sw.js"), {
      scope: "./"
      }
      then(function (reg) {
      console.log("Service worker  registered");
      console.log("by mickiDev another one :D");
      });
  }

  // Perform install steps
let CACHE_NAME = 'my-cache';
let urlsToCache = [
    './css',
    './images',
    '.scripts/'
    ];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['pigment'];
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});





