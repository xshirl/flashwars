require("dotenv").config()

const express = require("express")
const http = require("http")

const morgan = require("morgan")
const cors = require("cors")
const db = require("./db")
const routes = require("./routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
const setupSockets = require("./setupSockets")
const path = require("path")
const resolvedPath = path.resolve("./frontend/build/index.html")
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.static(path.join(__dirname, "build")))
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
}

app.use(cors(corsOption))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api", routes)

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/", (req, res) => {
  res.sendFile(resolvedPath)
})

setupSockets(io)

server.listen(3000)

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
