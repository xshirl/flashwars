let ids = [];

const setupSockets = (io) => {
  io.on('connection', (socket) => {
    ids.push(socket.id);
    console.log(`${socket.id} has connected`)

    io.sockets.emit('receive players', ids);

    socket.on('disconnect', () => {
      console.log('user has disconnected');
      ids = ids.filter(id => id !== socket.id)
      io.sockets.emit('remove ')
    })
    socket.on('startGame', () => {
      
    })
  })
}

module.exports = setupSockets