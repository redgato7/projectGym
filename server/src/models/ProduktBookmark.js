module.exports = (sequelize, DataTypes) => {
  const ProduktBookmark = sequelize.define('ProduktBookmark', {
  })

  ProduktBookmark.associate = function (models) {
    ProduktBookmark.belongsTo(models.User)
    ProduktBookmark.belongsTo(models.Produkt)
  }

  return ProduktBookmark
}
