const {
  TrainingBookmark,
  Training
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {trainingId} = req.query
      const where = {
        UserId: userId
      }
      if (trainingId) {
        where.TrainingId = trainingId
      }
      const trainingbookmarks = await TrainingBookmark.findAll({
        where: where,
        include: [
          {
            model: Training
          }
        ]
      })
        .map(trainingbookmark => trainingbookmark.toJSON())
        .map(trainingbookmark => _.extend(
          {},
          trainingbookmark.Training,
          trainingbookmark
        ))
      res.send(trainingbookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the trainingbookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {trainingId} = req.body
      const trainingbookmark = await TrainingBookmark.findOne({
        where: {
          TrainingId: trainingId,
          UserId: userId
        }
      })
      if (trainingbookmark) {
        return res.status(400).send({
          error: 'you already have this set as a trainingbookmark'
        })
      }
      const newTrainingBookmark = await TrainingBookmark.create({
        TrainingId: trainingId,
        UserId: userId
      })
      res.send(newTrainingBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the trainingbookmark'
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {trainingbookmarkId} = req.params
      const trainingbookmark = await TrainingBookmark.findOne({
        where: {
          id: trainingbookmarkId,
          UserId: userId
        }
      })
      if (!trainingbookmark) {
        return res.status(403).send({
          error: 'you do not have access to this trainingbookmark'
        })
      }
      await trainingbookmark.destroy()
      res.send(trainingbookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the trainingbookmark'
      })
    }
  }
}
