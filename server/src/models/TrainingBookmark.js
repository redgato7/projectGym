module.exports = (sequelize, DataTypes) => {
  const TrainingBookmark = sequelize.define('TrainingBookmark', {})

  TrainingBookmark.associate = function (models) {
    TrainingBookmark.belongsTo(models.User)
    TrainingBookmark.belongsTo(models.Training)
  }

  return TrainingBookmark
}
