//* [X] Create Review - Only By registered users
//* [X] Get Review
//* [X] Get All Reviews
//* [X] Delete Review - Only by who created it and Admin
//* [X] Update Review - Only by who created it

const Review = require("../Models/Review");
const Place = require("../Models/Place");
const { StatusCodes } = require("http-status-codes");
const Errors = require("../errors");

// ! Create A Review
const createReview = async (req, res) => {
  const { title, comment, place, rating } = req.body;

  const alreadyReviewed = await Review.findOne({
    place,
    user: req.user.userId,
  });

  if (alreadyReviewed) throw new Errors.BadRequestError("Already reviewed");

  const isValidPlace = await Place.findOne({ _id: place });

  if (!isValidPlace) throw new Errors.BadRequestError("Not a valid place");

  const review = await Review.create({
    title,
    rating,
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

  if (review.user === req.user.userId || req.user.userAccountType) {
    review.remove();
    res.status(StatusCodes.OK).json({ review });
  }

  throw new Errors.BadRequestError("Doesn't have access to delete review");
};

//! Update Review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, comment, rating } = req.body;
  const review = await Review.findOne({ _id: id, user: req.user.userId });
  if (!review) throw new Errors.BadRequestError("No Review found");
  if (rating <= 0 || rating > 10)
    throw new Errors.BadRequestError("Review must be between 0 and 10");

  if (title) review.title = title;
  if (comment) review.comment = comment;
  if (rating) review.rating = rating;

  review.save();
  res.status(StatusCodes.OK).json({ review });
};

module.exports = {
  updateReview,
  createReview,
  getReview,
  getAllReviews,
  deleteReview,
};
