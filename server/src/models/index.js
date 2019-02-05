const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize( // sequelize tworzy ponizsze tabele jesli nie istnieja
  config.db.database, // baza danych -config.js
  config.db.user, // uzytkownik
  config.db.password, // haslo
  config.db.options // opcje
)

fs
  .readdirSync(__dirname) // czytanie z aktualnego folderu
  .filter((file) =>
    file !== 'index.js' // nie chcemy index.js tylko wszstkie inne .js'y
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
