module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
    title: DataTypes.STRING,
    autor: DataTypes.STRING,
    grupaMiesniowa: DataTypes.STRING,
    angazowaneMiesnie: DataTypes.STRING,
    jakrobicUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    opis: DataTypes.TEXT,
    tab: DataTypes.TEXT
  })

  Training.associate = function (models) {
  }

  return Training
}
