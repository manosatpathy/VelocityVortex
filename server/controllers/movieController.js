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

module.exports = getMovies;
