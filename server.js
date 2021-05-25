const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + "/public");

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

let mensagens = [];
let threads = [];

io.on('connection', (socket) => {
    console.log('Socket conectado: ' + socket.id);

    socket.emit('threadsAnteriores', threads);
    socket.emit('mensagensAnteriores', mensagens);

    socket.on('novaMensagem', (pacoteMensagem) => {
        mensagens.push(pacoteMensagem);
        socket.broadcast.emit('mensagemRecebida', pacoteMensagem);
    });

    socket.on('novaThread', (threadId) => {
        threads.push(threadId);
        socket.broadcast.emit('threadRecebida', threadId);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando!');
});
