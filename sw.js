// sw.js - Gestor de segundo plano
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Permite que la notificación se muestre correctamente
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "GymBro", {
      body: data.body || "¡Descanso terminado!",
      icon: "icon-192.png",
      vibrate: [200, 100, 200]
    })
  );
});
