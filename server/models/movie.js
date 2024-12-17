module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      title: DataTypes.STRING,
      tmdbId: DataTypes.INTEGER, // TMDB Movie ID
      genre: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      actors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      releaseYear: DataTypes.INTEGER,
      rating: DataTypes.FLOAT, // From TMDB
      description: DataTypes.TEXT,
    },
    {
      tableName: "movies",
    }
  );

  Movie.associate = (models) => {
    Movie.hasMany(models.Review, { foreignKey: "movieId", as: "reviews" });
    Movie.hasMany(models.Watchlist, {
      foreignKey: "movieId",
      as: "watchlists",
    });
    Movie.hasMany(models.Wishlist, { foreignKey: "movieId", as: "wishlists" });
    Movie.hasMany(models.CuratedListItem, {
      foreignKey: "movieId",
      as: "curatedListItems",
    });
  };

  return Movie;
};
