const Favorites = require("../Models/Favorites");

const addFavorites = (req, res) => {
  res.send("Favorite one created");
};
const getSingleUserFavorites = (req, res) => {
  res.send("Favorites of a one user");
};

module.exports = { addFavorites, getSingleUserFavorites };
