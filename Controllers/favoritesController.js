const Favorites = require("../Models/Favorites");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

//* [X] Add Favorite
//* [X] Get Favorites
// [] Delete Favorites
// [] Add Queries to the Get all Favorites

//! Add Favorite
const addFavorites = async (req, res) => {
  const { place } = req.body;
  const favorite = await Favorites.create({ place, user: req.user.userId });
  res.status(StatusCodes.CREATED).json({ msg: "Added to Favorites", favorite });
};

//! Get All Favorites by specific User
const getSingleUserFavorites = async (req, res) => {
  // if (req.user.userId)
  //   throw new Errors.unauthorized("Doesn't have acces to this route");

  const favorites = await Favorites.find({ user: req.user.userId });

  if (!favorites)
    throw new Errors.NotFoundError("Favorite with id " + id + " not found");

  res.status(StatusCodes.OK).json({ nbFavorites: favorites.length, favorites });
};

//! Delete a favorite place of a specific user
const deleteSingleUserFavorites = async (req, res) => {
  const { id } = req.params;
  const user = req.user.userId;

  const favorite = await Favorites.findOne({ _id: id, user });
  if (!favorite) throw new Errors.NotFoundError("No Favorite Found");

  favorite.remove();

  res.status(StatusCodes.OK).json({ msg: "Favorite Removed", favorite });
};

module.exports = {
  addFavorites,
  deleteSingleUserFavorites,
  getSingleUserFavorites,
};
