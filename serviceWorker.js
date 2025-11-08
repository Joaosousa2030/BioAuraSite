// 🌀 Service Worker otimizado para o BioAura
const CACHE_NAME = "bioaura-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./favicon.png",
  "./logo-bioaura.png",
  "./manifest.json"
];

// 📦 Instalação: guardar ficheiros no cache
self.addEventListener("install", event => {
  console.log("🔹 Service Worker: instalação iniciada");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.error("⚠️ Erro ao instalar cache:", err))
  );
});

// 🔄 Ativação: limpar caches antigos e assumir controlo imediato
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
  console.log("✅ Service Worker ativo e cache limpo");
});

// 🌐 Gestão de pedidos: usar sempre a versão mais recente disponível
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      fetch(event.request)
        .then(response => {
          // Atualiza o cache com a nova versão do ficheiro
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => caches.match(event.request)) // Fallback offline
    )
  );
});