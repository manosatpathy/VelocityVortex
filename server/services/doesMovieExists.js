const { Movie } = require("../models");

const doesMovieExist = async (movieId) => {
  try {
    const movie = await Movie.findOne({ where: { tmdbId: movieId } });
    if (movie) {
      return { valid: true, id: movie.id };
    }
    return { valid: false };
  } catch (err) {
    throw new Error("Error checking movie existence: " + err.message);
  }
};

module.exports = doesMovieExist;
