const { Movie } = require("../models");
const apiClient = require("../utils/axiosInstance");
require("dotenv").config();

const fetchMovieAndCast = async (id) => {
  try {
    const movieDetailsResponse = await apiClient.get(
      `/movie/${id}?api_key=${process.env.API_KEY}`
    );
    const movieCastResponse = await apiClient.get(
      `/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );
    const movieDetails = movieDetailsResponse.data;
    const movieCast = movieCastResponse.data;

    const data = {
      title: movieDetails.title,
      tmdbId: movieDetails.id,
      genre: movieDetails.genres?.map((genre) => genre.name) || [],
      actors:
        movieCast.cast?.reduce((acc, curr) => {
          if (acc.length < 5 && curr.known_for_department === "Acting") {
            acc.push(curr.name);
          }
          return acc;
        }, []) || [],
      releaseYear: movieDetails.release_date?.slice(0, 4),
      rating: movieDetails.vote_average,
      description: movieDetails.overview,
    };
    const movie = await Movie.create(data);
    if (movie) {
      return { valid: true, id: movie.id };
    }
    return { valid: false };
  } catch (err) {
    throw new Error(
      `Error fetching movie or cast details for ID ${id}: ${err.message}`
    );
  }
};

module.exports = fetchMovieAndCast;
