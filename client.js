const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
    console.log('Клиент подключен к серверу');
    setInterval(() => {
        const command = { type: 'lightControl', command: 'toggle' }; 
        ws.send(JSON.stringify(command));
    }, 10000); 
});

ws.on('message', function incoming(data) {
    console.log(`Получены данные с датчиков: ${data}`);
});
