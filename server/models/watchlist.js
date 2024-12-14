module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    "Watchlist",
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: "Movies", key: "id" },
      },
      addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "watchlists",
    }
  );

  return Watchlist;
};
