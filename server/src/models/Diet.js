module.exports = (sequelize, DataTypes) => {
  const Diet = sequelize.define('Diet', {
    title: DataTypes.STRING,
    autor: DataTypes.STRING,
    typDania: DataTypes.STRING,
    skladniki: DataTypes.STRING,
    kcal: DataTypes.STRING,
    bialko: DataTypes.STRING,
    weglowodany: DataTypes.STRING,
    tluszcze: DataTypes.STRING,
    blonnik: DataTypes.STRING,
    jakrobicUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    opis: DataTypes.TEXT,
    tab: DataTypes.TEXT
  })

  Diet.associate = function (models) {
  }

  return Diet
}
