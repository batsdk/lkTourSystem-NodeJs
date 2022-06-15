const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name for the place"],
    minLength: 5,
    maxLength: 100,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Must provide a user"],
  },
  description: {
    type: String,
    minLength: 25,
    maxLength: 500,
    required: [true, "Must provide a description for the place"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Must provide an address for the place"],
    minLength: 5,
    maxLength: 100,
    trim: true,
  },
  images: {
    type: String,
    required: [true, "Must provide an image for the place"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  budget: {
    type: Number,
    min: 0,
    required: [true, "Must provide a budget for the place"],
  },
  district: {
    type: String,
    required: [true, "Must provide a district for the place"],
    enum: [
      "COLOMBO",
      "GAMPAHA",
      "KALUTARA",
      "KANDY",
      "MATALE",
      "NUWARA ELIYA",
      "GALLE",
      "MATARA",
      "HAMBANTOTA",
      "JAFFNA",
      "KILINOCHCHI",
      "MANNAR",
      "VAVUNIYA",
      "MULLATIV",
      "BATTICALOA",
      "AMPARA",
      "TRINCOMALEE",
      "KURUNEGALA",
      "PUTTALAM",
      "ANURADHAPURA",
      "POLONNARUWA",
      "BADULLA",
      "MONARAGALA",
      "RATNAPURA",
      "KEGALLE",
    ],
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
