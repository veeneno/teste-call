// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {};

io.on('connection', (socket) => {
    // Novo usuário se conecta
    socket.on('join', (username) => {
        users[socket.id] = username;
        io.emit('user-list', Object.values(users));
    });

    // Recebe o áudio e retransmite para os outros usuários
    socket.on('audio-stream', (data) => {
        socket.broadcast.emit('audio-stream', data);
    });

    // Usuário se desconecta
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('user-list', Object.values(users));
    });
});

app.get('/', (req, res) => {
    res.send('Servidor de chamada de voz ativo.');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
