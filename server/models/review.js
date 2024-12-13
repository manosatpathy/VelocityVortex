module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    movieId: {
      type: DataTypes.INTEGER,
      references: { model: "Movies", key: "id" },
    },
    rating: DataTypes.FLOAT, // User rating
    reviewText: DataTypes.STRING, // User review
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Review;
};
