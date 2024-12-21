const {
  getMovies,
  searchMoviesByGenreAndActor,
} = require("../controllers/movieController");
const express = require("express");
const router = express.Router();

router.get("/search", getMovies);
router.get("/searchByGenreAndActor", searchMoviesByGenreAndActor);

module.exports = router;
