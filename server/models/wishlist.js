module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: "movies", key: "id" },
      },
      addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "wishlists",
    }
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.Movie, { foreignKey: "movieId", as: "movie" });
  };

  return Wishlist;
};
