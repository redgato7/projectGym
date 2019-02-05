const {
  TrainingHistorie,
  Training
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const traininghistories = await TrainingHistorie.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Training
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .map(traininghistorie => traininghistorie.toJSON())
        .map(traininghistorie => _.extend(
          {},
          traininghistorie.Training,
          traininghistorie
        ))
      res.send(_.uniqBy(traininghistories, traininghistorie => traininghistorie.TrainingId))
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the traininghistorie'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {trainingId} = req.body
      const traininghistorie = await TrainingHistorie.create({
        TrainingId: trainingId,
        UserId: userId
      })
      res.send(traininghistorie)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the traininghistorie object'
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {traininghistorieId} = req.params
      const traininghistorie = await TrainingHistorie.findOne({
        where: {
          id: traininghistorieId,
          UserId: userId
        }
      })
      if (!traininghistorie) {
        return res.status(403).send({
          error: 'you do not have access to this traininghistorie'
        })
      }
      await traininghistorie.destroy()
      res.send(traininghistorie)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the traininghistorie'
      })
    }
  }
}
