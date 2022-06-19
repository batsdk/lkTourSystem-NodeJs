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

// * A user only can add to their favorites in one time
// an index entails multiple fields
FavoritesSchema.index({ place: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Favorites", FavoritesSchema);
