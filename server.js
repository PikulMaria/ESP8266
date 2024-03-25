const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(express.static('public')); 


wss.on('connection', (ws) => {
    console.log('Новое соединение');

    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        const data = JSON.parse(message);

        if (data.type === 'sensorData') {
            broadcast(JSON.stringify(data));
        }
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
