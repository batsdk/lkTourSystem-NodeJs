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
      required: [true, "Must Leave a Rating"],
      min: 1,
      max: 10,
    },
  },
  { timestamps: true }
);

ReviewSchema.statics.calculateAverage = async function (id) {
  const result = await this.aggregate([
    {
      $match: {
        place: id,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await this.model("Place").findOneAndUpdate(
      { _id: id },
      {
        rating: result[0]?.averageRating || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }

  console.log(result);
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverage(this.place);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverage(this.place);
});

module.exports = mongoose.model("Review", ReviewSchema);
