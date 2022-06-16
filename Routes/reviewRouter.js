const { Router } = require("express");
const { createReview } = require("../Controllers/reviewController");

// Import Authentication Functions
const { onlyUsers, onlyAdmin } = require("../middleware/acceptValidUsers");

const router = Router();

router.route("/").post(onlyUsers, createReview);

module.exports = router;
