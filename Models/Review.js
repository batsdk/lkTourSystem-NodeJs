const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      required: [true, "Must provide a user"],
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      minLength: 4,
      maxLength: 70,
      required: [true, "Must provide a title"],
      trim: true,
    },
    comment: {
      type: String,
      minLength: 15,
      maxLength: 355,
      required: [true, "Must provide a Comment"],
      trim: true,
    },
    place: {
      type: mongoose.Types.ObjectId,
      required: [true, "Must provide a place"],
      ref: "Place",
    },
    rating: {
      type: Number,
      required: [true, "Must provide a rating"],
      min: 1,
      max: 10,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", ReviewSchema);
