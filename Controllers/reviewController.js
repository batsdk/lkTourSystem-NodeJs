//* [X] Create Review - Only By registered users
// [] Get Review
// [] Get All Reviews
// [] Delete Review - Only by who created it
// [] Update Review - Only by who created it

const Review = require("../Models/Review");
const { StatusCodes } = require("http-status-codes");

// ! Create A Review
const createReview = async (req, res) => {
  const { title, comment, place } = req.body;

  const review = await Review.create({
    title,
    comment,
    place,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Successfull", review });
};

module.exports = { createReview };
