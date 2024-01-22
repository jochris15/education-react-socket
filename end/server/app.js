const express = require('express');
const app = express();
const PORT = 3000;
const { createServer } = require('node:http');
const { Server } = require('socket.io');

// Setup socket server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.get('/', (req, res) => {
  res.send("Bayi ambil tanganku")
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.emit("welcome", "Hello Mr/Mrs " + socket.id) // emit ke client yg lagi connect

  //count
  socket.on("count:add", (newCount) => {
    // gimana cara kirim ke semua orang yang connect?

    // ngirim ke semua yang connect including ke diri sendiri
    // io.emit("count:update", newCount)

    // ngirim ke semua kecuali diri sendiri
    socket.broadcast.emit("count:update", newCount);
  })

  socket.on("count:min", (newCount) => {
    socket.broadcast.emit("count:update", newCount);
  })

  //chat
  if (socket.handshake.auth) {
    console.log('username : ' + socket.handshake.auth.username);
  }

  socket.on("message:new", (message) => {
    io.emit("message:update", {
      from: socket.handshake.auth.username,
      message
    })
  })
});

server.listen(PORT, () => {
  console.log(`Aku cinta kamu ${PORT}`);
})