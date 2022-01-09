const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    password_digest: {
      type: String,
      required: true,
      unique: false,
    },
    points: {
      type: Number,
      default: 0,
      ref: "points",
    },
    rank: {
      type: Number,
      required: false,
    },
    decks: [
      {
        type: Schema.Types.ObjectId,
        ref: "decks",
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("users", User)
