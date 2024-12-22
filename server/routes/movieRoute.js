const {
  getMovies,
  searchMoviesByGenreAndActor,
  sortByRatingOrYearOfRelease,
} = require("../controllers/movieController");
const express = require("express");
const router = express.Router();

router.get("/search", getMovies);
router.get("/searchByGenreAndActor", searchMoviesByGenreAndActor);
router.get("/sort", sortByRatingOrYearOfRelease);

module.exports = router;
