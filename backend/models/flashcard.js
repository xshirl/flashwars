const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Flashcard = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
      unique: false,
    },
    difficulty: {
      type: Number,
      default: 0,
      required: true,
      unique: false,
    },
    deck: {
      type: Schema.Types.ObjectId,
      ref: "decks",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("flashcards", Flashcard)
