const { Watchlist } = require("../models");
const doesMovieExist = require("../services/doesMovieExists");
const fetchMovieAndCast = require("../services/fetchMovieAndCast");

const saveToWatchList = async (req, res) => {
  const movieId = req.body.movieId;
  try {
    if (!movieId) {
      return res.status(400).json({ message: "movie id is required" });
    }

    const movieInWatchList = await Watchlist.findOne({ where: { movieId } });
    if (movieInWatchList) {
      return res
        .status(400)
        .json({ message: "Movie is already in your watchlist." });
    }

    const movie = await doesMovieExist(movieId);
    if (!movie.valid) {
      const savedMovie = await fetchMovieAndCast(movieId);
      if (!savedMovie.valid) {
        throw new Error("Error saving movie data into database");
      }
      await Watchlist.create({ movieId: savedMovie.id });
    } else {
      await Watchlist.create({ movieId: movie.id });
    }

    return res
      .status(201)
      .json({ message: "Movie added to watchlist successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error adding movie to watchlist", error: err.message });
  }
};

module.exports = saveToWatchList;
