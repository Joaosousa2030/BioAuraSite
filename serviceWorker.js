// 🌀 Service Worker para o modo offline
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("bioaura-cache").then(cache => {
      return cache.addAll([
        "/BioAuraSite/",
        "/BioAuraSite/index.html",
        "/BioAuraSite/favicon.png",
        "/BioAuraSite/logo-bioaura.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});