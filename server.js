const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('views', __dirname + "/public");
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render('index.html');
});

let mensagens = [];

io.on('connection', (socket) => {
    console.log('Socket conectado: ' + socket.id);

    socket.on('novaMensagem', (pacoteMensagem) => {
        mensagens.push(pacoteMensagem);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando!');
});
