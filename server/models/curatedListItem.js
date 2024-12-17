module.exports = (sequelize, DataTypes) => {
  const CuratedListItem = sequelize.define(
    "CuratedListItem",
    {
      curatedListId: {
        type: DataTypes.INTEGER,
        references: { model: "curatedLists", key: "id" },
      },
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
      tableName: "curatedListItems",
    }
  );

  CuratedListItem.associate = (models) => {
    CuratedListItem.belongsTo(models.CuratedList, {
      foreignKey: "curatedListId",
      as: "curatedList",
    });
    CuratedListItem.belongsTo(models.Movie, {
      foreignKey: "movieId",
      as: "movie",
    });
  };
  return CuratedListItem;
};
