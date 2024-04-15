const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Соединение установлено');

    setInterval(() => {
        const ampere = Math.random() * 10;
        console.log(`Данные амперметра: ${ampere}`);
        const ampereData = JSON.stringify({ source: 'arduinoEmulator', type: 'ampere', value: ampere });
        ws.send(ampereData);
    }, 10000); // Отправляем данные амперметра каждые 10 секунд
});

ws.on('message', (message) => {
    console.log(`Получено сообщение от сервера: ${message}`);
});

ws.on('close', () => {
    console.log('Соединение закрыто');
});

ws.on('error', (error) => {
    console.error('Произошла ошибка:', error.message);
});
