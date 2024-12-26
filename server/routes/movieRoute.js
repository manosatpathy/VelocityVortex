const {
  getMovies,
  searchMoviesByGenreAndActor,
  sortByRatingOrYearOfRelease,
  getTopMoviesByRating,
} = require("../controllers/movieController");
const express = require("express");
const router = express.Router();

router.get("/search", getMovies);
router.get("/searchByGenreAndActor", searchMoviesByGenreAndActor);
router.get("/sort", sortByRatingOrYearOfRelease);
router.get("/top5", getTopMoviesByRating);

module.exports = router;
