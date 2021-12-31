const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

module.exports = mongoose.model("categories", Category)
