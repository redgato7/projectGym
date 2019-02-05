module.exports = (sequelize, DataTypes) => {
  const TrainingHistorie = sequelize.define('TrainingHistorie', {})

  TrainingHistorie.associate = function (models) {
    TrainingHistorie.belongsTo(models.User)
    TrainingHistorie.belongsTo(models.Training)
  }

  return TrainingHistorie
}
