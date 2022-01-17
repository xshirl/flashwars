const mongoose = require("mongoose")
const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/flashwars"

mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB.")
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })

const db = mongoose.connection

const bcrypt = require("bcrypt")
// const db = require("../backend/db")
const User = require("../models/user")
const Flashcard = require("../models/flashcard")
const Deck = require("../models/deck")
const Category = require("../models/category")

db.on("error", console.error.bind(console, "MongoDB connection error:"))

module.exports = db
