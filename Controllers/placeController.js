const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Place = require("../Models/Place");
const Errors = require("../errors");

//? [X] Get One
//? [X] Get All
//? [X] Update one
//? [X] Delete One
//? [X] Create One
// [] Add Query to Get All Places Route

// ! Create Place
const createPlace = async (req, res) => {
  const { name, description, address, images, budget, district } = req.body;

  const user = req.user.userId;

  const place = await Place.create({
    name,
    description,
    address,
    images,
    budget,
    district,
    user,
  });

  res.status(StatusCodes.OK).json({ msg: "Place Created", place });
};

// ! Get All Places
const getAllPlaces = async (req, res) => {
  const places = await Place.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: "Request Successful", nbPlaces: places.length, places });
};

// ! Get A Single Place
const getPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.find({ _id: id }).populate("reviews");

  if (!place || place.length <= 0)
    throw new Errors.NotFoundError("No Place Found");

  res.status(StatusCodes.OK).json({ msg: "Request Successful", place });
};

// ! Delete Place
const deletePlace = async (req, res) => {
  const { id } = req.params;

  const place = await Place.findOne({ _id: id });

  if (!place) throw new Errors.NotFoundError("Place not found");

  place.remove();

  res.status(StatusCodes.OK).json({ msg: "Place Deleted", place });
};

// ! Edit an exsisting place
const editPlace = async (req, res) => {
  const place = await Place.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { runValidators: true, newTrues: true }
  );

  if (!place) throw new Errors.BadRequestError("Place not found");

  res.status(StatusCodes.OK).json({ msg: "Update successfully", place });
};

// !image Upload
const imageUpload = async (req, res) => {
  console.log(req.files);

  let productImage = req.files.image;
  let maxSize = 3024 * 2024;

  // Checks for image type
  if (!productImage.mimetype.startsWith("image")) {
    throw new Errors.BadRequestError("Please upload a image");
  }

  // Checks for the size
  if (productImage.size > maxSize) {
    throw new Errors.BadRequestError(" Please try images with a smallersize");
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "LkPlacesSystem",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath); // delete temp files
  return res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url,
    },
  });
};

module.exports = {
  getPlace,
  deletePlace,
  editPlace,
  getAllPlaces,
  imageUpload,
  createPlace,
};
