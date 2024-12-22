const {
  Movie,
  Watchlist,
  Wishlist,
  CuratedListItem,
  CuratedList,
} = require("../models");
const fetchMoviesByQuery = require("../services/fetchMoviesByQuery");

const getMovies = async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await fetchMoviesByQuery(query);
    if (!movies || movies.length === 0) {
      return res.status(404).json({ movies: [], message: "No movies found" });
    }
    return res.status(200).json(movies);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error getting movies", Error: err.message });
  }
};

const searchMoviesByGenreAndActor = async (req, res) => {
  const { genre, actor, listType } = req.query;
  const allowedListTypes = ["wishList", "watchlist", "curatedList"];
  try {
    if (!genre || !actor || !listType) {
      return res
        .status(400)
        .json({ message: "genre , actor & listType required" });
    }

    if (!allowedListTypes.includes(listType)) {
      return res.status(400).json({
        message:
          "Invalid listType. Valid options are: wishList, watchlist, curatedList.",
      });
    }

    const movies = await Movie.findAll({
      where: { genre, actors: { [Op.contains]: [actor] } },
      attributes: ["id"],
    });

    if (movies.length === 0) {
      return res.status(200).json({ movies: [] });
    }

    const movieIds = movies.map((movie) => movie.dataValues.id);

    let result;

    switch (listType) {
      case "wishlist": {
        result = await Wishlist.findAll({
          where: { movieId: { [Op.in]: movieIds } },
        });
        break;
      }
      case "watchlist": {
        result = await Watchlist.findAll({
          where: { movieId: { [Op.in]: movieIds } },
        });
        break;
      }
      case "curatedList": {
        result = await CuratedListItem.findAll({
          where: { movieId: { [Op.in]: movieIds } },
        });
        break;
      }
      default: {
        return res.status(400).json({ message: "Invalid listType." });
      }
    }

    if (result && result.length > 0) {
      return res.status(200).json({ movies: result });
    } else {
      return res.status(200).json({ movies: [] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error searching movies", error: err.message });
  }
};

const sortByRatingOrYearOfRelease = async (req, res) => {
  const { list, sortBy, order } = req.query;
  const sortField = ["rating", "yearOfRelease"];
  const allowedLists = ["wishList", "watchlist", "curatedList"];
  try {
    if (!list || !sortBy || !order) {
      return res.status(400).json({
        message: "The fields 'list', 'sortBy', and 'order' are required.",
      });
    }
    if (!sortField.includes(sortBy)) {
      return res.status(400).json({
        message: "Invalid sort type. Only rating or yearOfRelease allowed ",
      });
    }
    if (!allowedLists.includes(list)) {
      return res.status(400).json({
        message:
          "Invalid listType. Valid options are: wishList, watchlist, curatedList.",
      });
    }

    let sortColumn;
    if (sortBy === "rating") {
      sortColumn = "rating";
    } else if (sortBy === "yearOfRelease") {
      sortColumn = "releaseYear";
    }

    let result;

    switch (list) {
      case "wishlist": {
        result = await Wishlist.findAll({ order: [[sortColumn, order]] });
        break;
      }
      case "watchlist": {
        result = await Watchlist.findAll({ order: [[sortColumn, order]] });
        break;
      }
      case "curatedList": {
        result = await CuratedListItem.findAll({
          order: [[sortColumn, order]],
        });
        break;
      }
      default: {
        return res.status(400).json({ message: "Invalid listType." });
      }
    }

    if (result && result.length > 0) {
      return res.status(200).json({ movies: result });
    } else {
      return res.status(200).json({ movies: [] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error searching movies", error: err.message });
  }
};

module.exports = {
  getMovies,
  searchMoviesByGenreAndActor,
  sortByRatingOrYearOfRelease,
};
