const { WishList } = require("../models");
const doesMovieExist = require("../services/doesMovieExists");
const fetchMovieAndCast = require("../services/fetchMovieAndCast");

const saveToWishList = async (req, res) => {
  const movieId = req.body.movieId;
  try {
    if (!movieId) {
      return res.status(400).json({ message: "movie id is required" });
    }

    const movieInWishList = await WishList.findOne({ where: { movieId } });
    if (movieInWishList) {
      return res
        .status(400)
        .json({ message: "Movie is already in your wishlist." });
    }

    const movie = await doesMovieExist(movieId);
    if (!movie.valid) {
      const savedMovie = await fetchMovieAndCast(movieId);
      if (!savedMovie.valid) {
        throw new Error("Error saving movie data into database");
      }
      await WishList.create({ movieId: savedMovie.id });
    } else {
      await WishList.create({ movieId: movie.id });
    }

    return res
      .status(201)
      .json({ message: "Movie added to wishlist successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error adding movie to wishlist", error: err.message });
  }
};

module.exports = saveToWishList;
