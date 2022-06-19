const { Router } = require("express");
const {
  addFavorites,
  getSingleUserFavorites,
} = require("../Controllers/favoritesController");

const router = Router();

router.route("/").post(addFavorites);
router.route("/:id").get(getSingleUserFavorites);

module.exports = router;
