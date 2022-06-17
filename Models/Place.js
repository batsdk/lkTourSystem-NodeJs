const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
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
    numOfReviews: {
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PlaceSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "place",
  justOne: false,
});

// User can only leave on review per product
// an index entails multiple fields
PlaceSchema.index({ product: 1, user: 1 }, { unique: true });

// ProductSchema.pre("remove", async function () {
//   await this.model("Reviews").deleteMany({ product: this._id });
// })

// Removing all the reviews related to this place
PlaceSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Place", PlaceSchema);
