// 🌀 Service Worker simples e estável para o BioAura
const CACHE_NAME = "bioaura-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./favicon.png",
  "./logo-bioaura.png",
  "./manifest.json"
];

self.addEventListener("install", e => {
  console.log("🔹 Service Worker: instalação iniciada");
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("🔹 Service Worker: a guardar ficheiros no cache");
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error("⚠️ Erro ao instalar cache:", err))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  console.log("✅ Service Worker ativo");
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});