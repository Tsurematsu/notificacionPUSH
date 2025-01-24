# Push Notifications con VAPID Keys en Node.js

Este proyecto demuestra la implementación de notificaciones push usando VAPID (Voluntary Application Server Identification) en Node.js.

## Requisitos Previos

- Node.js instalado
- NPM (Node Package Manager)
- Un navegador compatible con Push API

## Instalación

```bash
npm install web-push
```

## Configuración

1. Generar VAPID keys:

```bash
npx web-push generate-vapid-keys
```

2. Configurar las variables de entorno:

```env
VAPID_PUBLIC_KEY=tu_clave_publica
VAPID_PRIVATE_KEY=tu_clave_privada
```

## Implementación

### Backend (Node.js)

```javascript
const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:tu@email.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)
```

### Frontend

```javascript
// Registrar Service Worker
navigator.serviceWorker.register('/sw.js')

// Solicitar permiso y suscribir
const subscription = await registerPushNotification()
```

## Uso

1. Suscribir al usuario a las notificaciones
2. Enviar la suscripción al servidor
3. Usar el servidor para enviar notificaciones push

## Documentación Adicional

- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [web-push npm package](https://www.npmjs.com/package/web-push)
