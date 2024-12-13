module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    title: DataTypes.STRING,
    tmdbId: DataTypes.INTEGER, // TMDB Movie ID
    genre: DataTypes.TEXT,
    actors: DataTypes.TEXT,
    releaseYear: DataTypes.INTEGER,
    rating: DataTypes.FLOAT, // From TMDB
    description: DataTypes.TEXT,
  });
  return Movie;
};
