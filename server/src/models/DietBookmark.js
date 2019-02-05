module.exports = (sequelize, DataTypes) => {
  const DietBookmark = sequelize.define('DietBookmark', {})

  DietBookmark.associate = function (models) {
    DietBookmark.belongsTo(models.User)
    DietBookmark.belongsTo(models.Diet)
  }

  return DietBookmark
}
