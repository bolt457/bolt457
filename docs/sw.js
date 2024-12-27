self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('africoin-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/africoin.html',
        '/shop-africoins.html',
        '/ads.html',
        '/betting.html',
        '/conversion.html',
        '/game.html',
        '/stars.html',
        '/statistics.html',
        '/chatbot',
        '/investment.html',
        '/shop.html',
        '/icon-192x192.png',
        '/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});