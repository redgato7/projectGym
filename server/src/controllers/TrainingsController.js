const {Training} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let trainings = null
      const search = req.query.search
      if (search) {
        trainings = await Training.findAll({
          where: {
            $or: [
              'title', 'autor', 'grupaMiesniowa', 'angazowaneMiesnie'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        trainings = await Training.findAll({
          limit: 10
        })
      }
      res.send(trainings)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the trainings'
      })
    }
  },
  async show (req, res) {
    try {
      const training = await Training.findById(req.params.trainingId)
      res.send(training)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the trainings'
      })
    }
  },
  async post (req, res) {
    try {
      const training = await Training.create(req.body)
      res.send(training)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the training'
      })
    }
  },
  async put (req, res) {
    try {
      await Training.update(req.body, {
        where: {
          id: req.params.trainingId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the training'
      })
    }
  },
  async remove (req, res) {
    try {
      const {trainingId} = req.params
      const training = await Training.findOne({
        where: {
          id: trainingId
        }
      })
      if (!training) {
        return res.status(403).send({
          error: 'you do not have access to this trainingb'
        })
      }
      await training.destroy()
      res.send(training)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the training'
      })
    }
  }
}
