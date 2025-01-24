// @ts-nocheck
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import readline from 'node:readline';
import webPush from 'web-push';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const app = express();
const port = 3000;
const vapidKeys = webPush.generateVAPIDKeys();
const PUBLIC_VAPID_KEY = vapidKeys.publicKey;
const PRIVATE_VAPID_KEY = vapidKeys.privateKey;


webPush.setVapidDetails(
    'mailto:tu-email@example.com',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);

// app.use((_, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

let pushSubscription;
app.post('/subscribe', (req, res) => {
    pushSubscription = req.body;
    res.status(201).json({});
});

app.use(["/", "/index.html"], (req, res, next) => {
    res.cookie('PUBLIC_VAPID_KEY', PUBLIC_VAPID_KEY, { httpOnly: false });
    next();
});

app.use(express.static('public'));
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

loopMsg();
async function loopMsg() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const message = await input("Mensaje: ");
    templateSend1(message);
    loopMsg();
}

async function templateSend1(body) {
    await sendNotification({
        title: 'Notificación Push',
        body,
        icon: './public/campana.png',
        badge: 'badge.png'
    })
}
function input(query) { return new Promise(resolve => rl.question(query, resolve)); }
async function sendNotification(data) {
    if (!pushSubscription) return res.status(200).json({ error: 'No hay suscripciones' });
    const payload = JSON.stringify(data);
    try {
        await webPush.sendNotification(pushSubscription, payload)
    } catch (error) {
        console.log('Error al enviar notificación');
    }
}