const express = require("express");
const router = express.Router();
const addReviewsToMovies = require("../controllers/reviewController");

router.post("/:movieId/reviews", addReviewsToMovies);

module.exports = router;
