const addReviewsToMovies = async (req, res) => {
  const movieId = req.params.movieId;
  const { rating, reviewText } = req.body;
  try {
    if (!movieId) {
      return res.status(400).json({ message: "movieId is required." });
    }
    if (!rating || rating < 0 || rating > 10 || reviewText.length > 500) {
      return res.status(400).json({
        message:
          "Rating must be between 0 and 10, and review must be under 500 characters.",
      });
    }
    await Review.create({ movieId, rating, reviewText });
    return res.status(201).json({ message: "Review added successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error adding reviews to movies.", err: err.message });
  }
};
