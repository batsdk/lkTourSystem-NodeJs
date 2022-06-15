const { Router } = require("express");
const {
  getPlace,
  deletePlace,
  createPlace,
  editPlace,
  imageUpload,
  getAllPlaces,
} = require("../Controllers/placeController");

// Import Authentication Functions
const { onlyUsers, onlyAdmin } = require("../middleware/acceptValidUsers");

const router = Router();

router.route("/").get(getAllPlaces).post(onlyUsers, createPlace);
router.route("/upload").post(imageUpload);
router.route("/delete/:id").delete(deletePlace);

module.exports = router;
