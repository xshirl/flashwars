let usernames = new Set()
let ids = []
const setupSockets = (io) => {
  io.on("connection", (socket) => {
    ids.push(socket.id)
    console.log(`${socket.id} has connected`)

    io.sockets.emit("receive players", ids)

    socket.on("ready", (username) => {
      console.log("user" + username)
      usernames.add(username)
      if (usernames.size === ids.length) {
        io.sockets.emit("startGame")
      }
    })

    socket.on("startGame", () => {
      const namesArray = [...usernames]
      const randomIndex = Math.floor(Math.random() * namesArray.length)
      const startUser = namesArray[randomIndex]
      io.sockets.emit("showDeckChoices", startUser)
    })

    socket.on("showFlashcard", () => {
      // start 1 min timer
      setTimeout(() => {
        socket.emit("endRound")
      }, 60000)
    })

    socket.on("endRound", () => {
      alert("Round ended")
    })

    socket.on("endGame", () => {})
    socket.on("disconnect", () => {
      console.log("user has disconnected")
      ids = ids.filter((id) => id !== socket.id)
      io.sockets.emit("remove ")
    })
    socket.on("startGame", () => {})
  })
}

module.exports = setupSockets
