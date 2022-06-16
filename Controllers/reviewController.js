//* [X] Create Review - Only By registered users
//* [X] Get Review
//* [X] Get All Reviews
// [] Delete Review - Only by who created it and Admin
// [] Update Review - Only by who created it

const Review = require("../Models/Review");
const Place = require("../Models/Place");
const { StatusCodes } = require("http-status-codes");
const Errors = require("../errors");

// ! Create A Review
const createReview = async (req, res) => {
  const { title, comment, place } = req.body;

  const alreadyReviewed = await Review.findOne({
    place,
    user: req.user.userId,
  });

  if (alreadyReviewed) throw new Errors.BadRequestError("Already reviewed");

  const isValidPlace = await Place.findOne({ _id: place });

  if (!isValidPlace) throw new Errors.BadRequestError("Not a valid place");

  const review = await Review.create({
    title,
    comment,
    place,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Successfull", review });
};

//! Get All Reviews
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ nbReviews: reviews.length, reviews });
};

// ! Get Review
const getReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) throw new Errors.BadRequestError("Review not found");

  res.status(StatusCodes.OK).json({ review });
};

//! Delete single Review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) throw new Errors.BadRequestError("Review not found");

  review.remove();
  res.status(StatusCodes.OK).json({ review });
};

module.exports = { createReview, getReview, getAllReviews, deleteReview };
