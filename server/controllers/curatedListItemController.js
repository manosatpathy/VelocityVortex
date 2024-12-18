const { CuratedListItem } = require("../models");
const doesMovieExist = require("../services/doesMovieExists");
const fetchMovieAndCast = require("../services/fetchMovieAndCast");

const saveToCuratedList = async (req, res) => {
  const { movieId, curatedListId } = req.body;
  try {
    if (!movieId || !curatedListId) {
      return res
        .status(400)
        .json({ message: "Both movieId and curatedListId are required." });
    }

    const movieInCuratedList = await CuratedListItem.findOne({
      where: { movieId, curatedListId },
    });
    if (movieInCuratedList) {
      return res
        .status(400)
        .json({ message: "Movie is already in your curated list." });
    }

    const movie = await doesMovieExist(movieId);
    if (!movie.valid) {
      const savedMovie = await fetchMovieAndCast(movieId);
      if (!savedMovie.valid) {
        throw new Error("Error saving movie data into database");
      }
      await CuratedListItem.create({ curatedListId, movieId: savedMovie.id });
    } else {
      await CuratedListItem.create({ curatedListId, movieId: movie.id });
    }

    return res
      .status(201)
      .json({ message: "Movie added to curated list successfully." });
  } catch (err) {
    return res.status(500).json({
      message: "Error adding movie to curated list",
      error: err.message,
    });
  }
};

module.exports = saveToCuratedList;
