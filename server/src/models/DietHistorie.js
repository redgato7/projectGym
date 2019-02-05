module.exports = (sequelize, DataTypes) => {
  const DietHistorie = sequelize.define('DietHistorie', {})

  DietHistorie.associate = function (models) {
    DietHistorie.belongsTo(models.User)
    DietHistorie.belongsTo(models.Diet)
  }

  return DietHistorie
}
