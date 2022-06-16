const { Router } = require("express");
const {
  createReview,
  getReview,
  getAllReviews,
  deleteReview,
} = require("../Controllers/reviewController");

// Import Authentication Functions
const { onlyUsers, onlyAdmin } = require("../middleware/acceptValidUsers");

const router = Router();

router.route("/").post(onlyUsers, createReview).get(getAllReviews);
router.route("/:id").get(getReview).delete(onlyUsers, onlyAdmin, deleteReview);

module.exports = router;
