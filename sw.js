self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(clients.claim()); });

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

self.addEventListener('push', function(event) {
  let data = { title: '?????? ????????', body: '???? ????? ?????' };
  if (event.data) {
    try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
  }
  
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSIuOWVtIiBmb250LXNpemU9IjkwIj7wn5OaPC90ZXh0Pjwvc3ZnPg==',
    badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSIuOWVtIiBmb250LXNpemU9IjkwIj7wn5OaPC90ZXh0Pjwvc3ZnPg==',
    vibrate: [300, 100, 300, 100, 300], // ????? ?????
    sound: 'default', // ???? ??????? ????
    requireInteraction: true, // ????? ??? ???? ??????? ?? ????? ???? ???
    tag: 'library-alert', // ??????? ?? ??? ??? ??? ????? ??????
    data: { url: './index.html' }
  };
  
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow(event.notification.data.url);
    })
  );
});