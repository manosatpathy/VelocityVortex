const { Op } = require("sequelize");
const {
  Movie,
  Watchlist,
  Wishlist,
  CuratedListItem,
  Review,
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
  const allowedListTypes = ["wishlist", "watchlist", "curatedList"];
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
      where: {
        genre: { [Op.contains]: [genre] },
        actors: { [Op.contains]: [actor] },
      },
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
          attributes: ["movieId"],
        });
        break;
      }
      case "watchlist": {
        result = await Watchlist.findAll({
          where: { movieId: { [Op.in]: movieIds } },
          attributes: ["movieId"],
        });
        break;
      }
      case "curatedList": {
        result = await CuratedListItem.findAll({
          where: { movieId: { [Op.in]: movieIds } },
          attributes: ["movieId"],
        });
        break;
      }
      default: {
        return res.status(400).json({ message: "Invalid listType." });
      }
    }

    if (result && result.length > 0) {
      const resultMovieIds = result.map((item) => item.movieId);
      const filteredMovies = movies.filter((movie) =>
        resultMovieIds.includes(movie.dataValues.id)
      );
      return res.status(200).json({ movies: filteredMovies });
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
  const allowedLists = ["wishlist", "watchlist", "curatedlist"];
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
          "Invalid listType. Valid options are: wishlist, watchlist, curatedlist.",
      });
    }
    if (order !== "ASC" && order !== "DESC") {
      return res.status(400).json({
        message: "order can only be ASC or DESC",
      });
    }

    const sortColumn = sortBy === "rating" ? "rating" : "releaseYear";
    let result;

    switch (list) {
      case "wishlist": {
        const wishlistMovieIds = await Wishlist.findAll({
          attributes: ["movieId"],
        });
        const movieIds = wishlistMovieIds.map((item) => item.movieId);
        result = await Movie.findAll({
          where: { id: { [Op.in]: movieIds } },
          order: [[sortColumn, order]],
        });
        break;
      }
      case "watchlist": {
        const watchlistMovieIds = await Watchlist.findAll({
          attributes: ["movieId"],
        });
        const movieIds = watchlistMovieIds.map((item) => item.movieId);
        result = await Movie.findAll({
          where: { id: { [Op.in]: movieIds } },
          order: [[sortColumn, order]],
        });
        break;
      }
      case "curatedlist": {
        const curatedListMovieIds = await CuratedListItem.findAll({
          attributes: ["movieId"],
        });
        const movieIds = curatedListMovieIds.map((item) => item.movieId);
        result = await Movie.findAll({
          where: { id: { [Op.in]: movieIds } },
          order: [[sortColumn, order]],
        });
        break;
      }
      default: {
        return res.status(400).json({ message: "Invalid listType." });
      }
    }

    if (result && result.length > 0) {
      const movieDetails = result.map((movie) => ({
        title: movie.title,
        tmdbId: movie.tmdbId,
        genre: movie.genre,
        actors: movie.actors,
        releaseyear: movie.releaseyear,
        rating: movie.rating,
      }));
      return res.status(200).json({ movies: movieDetails });
    } else {
      return res.status(200).json({ movies: [] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error searching movies", error: err.message });
  }
};

const getTopMoviesByRating = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [["rating", "DESC"]],
      limit: 5,
    });
    const movieIds = movies.map((movie) => movie.id);
    const reviews = await Review.findAll({
      where: { movieId: { [Op.in]: movieIds } },
    });

    const reviewMap = reviews.reduce((acc, review) => {
      const wordCount = review.reviewText.trim().split(/\s+/).length;
      if (acc[review.movieId]) {
        acc[review.movieId].push({
          reviewText: review.reviewText,
          wordCount: wordCount,
        });
      } else {
        acc[review.movieId] = [
          { reviewText: review.reviewText, wordCount: wordCount },
        ];
      }
      return acc;
    }, {});

    const result = movies.map((movie) => {
      const movieReview = reviewMap[movie.id];
      return {
        title: movie.title,
        rating: movie.rating,
        review: movieReview
          ? movieReview.map((rev) => ({
              text: rev.reviewText,
              wordCount: rev.wordCount,
            }))
          : null,
      };
    });
    return res.status(200).json({ movies: result });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error getting movies", error: err.message });
  }
};

module.exports = {
  getMovies,
  searchMoviesByGenreAndActor,
  sortByRatingOrYearOfRelease,
  getTopMoviesByRating,
};
