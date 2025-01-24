const PUBLIC_VAPID_KEY = getCookie('PUBLIC_VAPID_KEY');
console.log('PUBLIC_VAPID_KEY', PUBLIC_VAPID_KEY);  // Ahora debería mostrar "Hola esta es una prueba"

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // @ts-ignore
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());

}

main()
async function main() {
    await resetServiceWorker();
    const permission = await Notification.requestPermission();
    if (permission === 'denied') return console.log('Permission denied');
    if (permission === 'default') return console.log('Permission closed');
    if (!('serviceWorker' in navigator)) return console.log('Service Worker not supported');
    if (!('PushManager' in window)) return console.log('Push API not supported');
    subscribe();
}

async function subscribe() {
    const registration = await navigator.serviceWorker.register('./sw.js');
    console.log('Service Worker registered');
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY
    })
    console.log('Usuario suscrito', subscription);
    await sendSubscriptionToBackEnd(subscription);
    console.log('Suscrito en el servidor', subscription);
}

async function sendSubscriptionToBackEnd(subscription) {
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function resetServiceWorker() {
    const registration = await navigator.serviceWorker.getRegistration();
    // @ts-ignore
    await registration.unregister();
    console.log('Service Worker reset');
}