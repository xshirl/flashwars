require("dotenv").config()

const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const morgan = require("morgan")
const cors = require("cors")
const db = require("./db")
const routes = require("./routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const setupSockets = require("./setupSockets")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
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
  res.send("Hello World!")
})

const httpServer = createServer(app)
const io = new Server(httpServer, {})

setupSockets(io)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
