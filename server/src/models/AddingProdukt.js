module.exports = (sequelize, DataTypes) => {
  const AddingProdukt = sequelize.define('AddingProdukt', {
    gramatura: DataTypes.STRING,
    title: DataTypes.STRING,
    kcal: DataTypes.STRING,
    bialko: DataTypes.STRING,
    weglowodany: DataTypes.STRING,
    tluszcz: DataTypes.STRING

  })

  AddingProdukt.associate = function (models) {
    AddingProdukt.belongsTo(models.User)
  }

  return AddingProdukt
}
