const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Соединение установлено');
    // Отправляем данные 0 и 1 поочередно
    setInterval(() => {
        const data = Math.random() < 0.5 ? 0 : 1;
        console.log(`Отправляю данные: ${data}`);
        ws.send(data.toString());
    }, 5000); // Отправляем данные каждые 5 секунд
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
