const http = require('http');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 5000;

app.use(express.static('public'));

app.get('/refresh', (req, res) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('refresh');
        }
    });
    res.json({ success: true });
});

wss.on('connection', (ws) => {
    console.log('Client connected');
});

server.listen(process.env.PORT || port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});