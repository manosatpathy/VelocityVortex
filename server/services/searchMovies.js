const axios = require("axios");
require("dotenv").config();

const searchMovies = async (query) => {
  try {
    const movieDetails = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}`
    );
    const movies = movieDetails.data.results;

    const result = await Promise.all(
      movies.map(async (movie) => {
        const actorsDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.API_KEY}`
        );
        const actorNames = actorsDetails.data.cast
          .filter((actor) => actor.known_for_department === "Acting")
          .map((actor) => actor.name);
        return {
          title: movie.title,
          tmdbId: movie.id,
          genre: movie.genre_ids,
          actors: actorNames,
          releaseYear: movie.release_date.slice(0, 4),
          rating: movie.vote_average,
          description: movie.overview,
        };
      })
    );
    return { movies: result };
  } catch (err) {
    throw err;
  }
};

module.exports = searchMovies;
