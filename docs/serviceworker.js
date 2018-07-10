self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});


self.addEventListener('push', function(e) {
  console.log('[ServiceWorker] push')
  console.log(e.data.text())
  const title = 'Notification message'
  const payload = {
    body: e.data.text(),
    icon: '',
    tag: ''
  }

  e.waitUntil(
    self.registration.showNotification(title, payload)
  );
});
