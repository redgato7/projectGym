const {Diet} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let diets = null
      const search = req.query.search
      if (search) {
        diets = await Diet.findAll({
          where: {
            $or: [
              'title', 'autor', 'typdania', 'skladniki'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        diets = await Diet.findAll({
          limit: 10
        })
      }
      res.send(diets)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the diets'
      })
    }
  },
  async show (req, res) {
    try {
      const diet = await Diet.findById(req.params.dietId)
      res.send(diet)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the diets'
      })
    }
  },
  async post (req, res) {
    try {
      const diet = await Diet.create(req.body)
      res.send(diet)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the diet'
      })
    }
  },
  async put (req, res) {
    try {
      await Diet.update(req.body, {
        where: {
          id: req.params.dietId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the diet'
      })
    }
  },
  async remove (req, res) {
    try {
      const {dietId} = req.params
      const diet = await Diet.findOne({
        where: {
          id: dietId
        }
      })
      if (!diet) {
        return res.status(403).send({
          error: 'you do not have access to this dietb'
        })
      }
      await diet.destroy()
      res.send(diet)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the diet'
      })
    }
  }
}
