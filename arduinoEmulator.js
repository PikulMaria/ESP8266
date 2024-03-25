const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
    console.log('Эмулятор Arduino подключен к серверу');
   
    setInterval(() => {
        const data = {
            type: 'sensorData',
            temperature: Math.random() * 30,
            humidity: Math.random() * 100
        };
        ws.send(JSON.stringify(data));
    }, 5000);
});

ws.on('message', function incoming(data) {
    console.log(`Получена команда от сервера: ${data}`);
});
