const axios = require("axios");
require("dotenv").config();

const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}`
    );
    const result = response.data;
    return { result, message: "working" };
  } catch (err) {
    throw err;
  }
};

module.exports = searchMovies;
