const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error getting movies", Error: err.message });
  }
};
