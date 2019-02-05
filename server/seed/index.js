const {
  sequelize,
  Training,
  Produkt,
  Diet,
  User,
  TrainingBookmark,
  TrainingHistorie,
  DietBookmark,
  DietHistorie,
  ProduktBookmark
} = require('../src/models')

const Promise = require('bluebird')
const trainings = require('./trainings.json')
const produkts = require('./produkts.json')
const diets = require('./diets.json')
const users = require('./users.json')
const trainingbookmarks = require('./trainingbookmarks.json')
const traininghistories = require('./traininghistories.json')
const dietbookmarks = require('./dietbookmarks.json')
const produktbookmarks = require('./produktookmarks.json')
const diethistories = require('./diethistories.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      trainings.map(training => {
        Training.create(training)
      })
    )

    await Promise.all(
      produkts.map(produkt => {
        Produkt.create(produkt)
      })
    )


    await Promise.all(
      diets.map(diet => {
        Diet.create(diet)
      })
    )

    await Promise.all(
      dietbookmarks.map(dietbookmark => {
        DietBookmark.create(dietbookmark)
      })
    )

    await Promise.all(
      produktbookmarks.map(produktbookmark => {
        ProduktBookmark.create(produktbookmark)
      })
    )

    await Promise.all(
      diethistories.map(diethistorie => {
        DietHistorie.create(diethistorie)
      })
    )

    await Promise.all(
      trainingbookmarks.map(trainingbookmark => {
        TrainingBookmark.create(trainingbookmark)
      })
    )

    await Promise.all(
      traininghistories.map(traininghistorie => {
        TrainingHistorie.create(traininghistorie)
      })
    )
  })
