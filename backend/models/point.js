const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Points = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    points: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("points", Points)
