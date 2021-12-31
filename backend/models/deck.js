const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Deck = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    flashcards: [
      {
        type: Schema.Types.ObjectId,
        ref: "flashcards",
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("decks", Deck)
