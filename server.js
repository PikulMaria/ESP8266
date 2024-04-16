const WebSocket = require('ws');
console.log('Привет, я сервер');
const wss = new WebSocket.Server({ port: 8080 });

let arduinoClient = null;

wss.on('connection', (ws) => {
    console.log('Новое соединение');

    ws.on('message', (message) => {
        console.log(`Получено сообщение от клиента: ${message}`);
        if (arduinoClient) {
            arduinoClient.send(message);
        }
    });
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Получено сообщение от Arduino: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.source === 'arduinoEmulator') {
            arduinoClient = ws;
        }
    });

    ws.on('close', () => {
        if (ws === arduinoClient) {
            arduinoClient = null;
        }
    });
});
