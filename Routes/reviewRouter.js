const { Router } = require("express");
const { createReview, getReview } = require("../Controllers/reviewController");

// Import Authentication Functions
const { onlyUsers, onlyAdmin } = require("../middleware/acceptValidUsers");

const router = Router();

router.route("/").post(onlyUsers, createReview);
router.route("/:id").post(getReview);

module.exports = router;
