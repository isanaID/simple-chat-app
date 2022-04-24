const express = require('express');
const app = express();
const io = require('socket.io')();
const port = 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', ({ name, message}) => {
        console.log(`${name}: ${message}`);
        io.emit('message', { name, message });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));