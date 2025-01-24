// @ts-nocheck

self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.showNotification('Notificación Push', event.data.json())
    );
});
