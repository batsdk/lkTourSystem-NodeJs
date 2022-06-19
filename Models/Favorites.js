const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "Must provide a User"],
      ref: "User",
    },
    place: {
      type: mongoose.Types.ObjectId,
      required: [true, "Must provide a Place"],
      ref: "Place",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorites", FavoritesSchema);
