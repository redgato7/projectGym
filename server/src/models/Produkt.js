module.exports = (sequelize, DataTypes) => {
  const Produkt = sequelize.define('Produkt', {
    title: DataTypes.STRING,
    kategoria: DataTypes.STRING,
    kcal: DataTypes.STRING,
    bialko: DataTypes.STRING,
    weglowodany: DataTypes.STRING,
    tluszcz: DataTypes.STRING
  })

  Produkt.associate = function (models) {
  }

  return Produkt
}
