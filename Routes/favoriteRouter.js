const { Router } = require("express");
const {
  addFavorites,
  getSingleUserFavorites,
  deleteSingleUserFavorites,
} = require("../Controllers/favoritesController");

// Import Authentication Functions
const { onlyUsers, onlyAdmin } = require("../middleware/acceptValidUsers");

const router = Router();

router
  .route("/")
  .post(onlyUsers, addFavorites)
  .get(onlyUsers, getSingleUserFavorites);

router.route("/:id").delete(onlyUsers, deleteSingleUserFavorites);

module.exports = router;
