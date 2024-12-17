module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: "movies", key: "id" },
      },
      rating: DataTypes.FLOAT, // User rating
      reviewText: DataTypes.STRING, // User review
      addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "reviews",
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.Movie, { foreignKey: "movieId", as: "movie" });
  };
  return Review;
};
