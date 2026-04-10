const CACHE_NAME = 'gymbro-v2';
const assets = [
  './',
  './gymapp.html',
  './manifest.json',
  './icon-192.png',
  './beep.mp3'
];

// Instalación y caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// ESCUCHA DE MENSAJES PARA EL TEMPORIZADOR
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_TIMER') {
    const delay = event.data.delay; // milisegundos
    
    // Programamos la notificación para que salte incluso si la app está cerrada
    setTimeout(() => {
      self.registration.showNotification("¡Descanso terminado!", {
        body: "Vuelve al entrenamiento.",
        icon: "icon-192.png",
        vibrate: [300, 100, 300],
        tag: "gymbro-timer", // evita que se acumulen varias
        renotify: true,
        data: { url: './' } 
      });
    }, delay);
  }
});

// Al hacer clic en la notificación, vuelve a la app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('./');
    })
  );
});
