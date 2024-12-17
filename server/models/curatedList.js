module.exports = (sequelize, DataTypes) => {
  const CuratedList = sequelize.define(
    "CuratedList",
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "curatedLists",
    }
  );
  CuratedList.associate = (models) => {
    CuratedList.hasMany(models.CuratedListItem, {
      foreignKey: "curatedListId",
      as: "curatedListItems",
    });
  };
  return CuratedList;
};
