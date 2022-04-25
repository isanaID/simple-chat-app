const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

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

http.listen(4000, () => {
    console.log('listening on *:4000');
});