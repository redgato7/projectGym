const {Produkt} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let produkts = null
      const search = req.query.search
      if (search) {
        produkts = await Produkt.findAll({
          where: {
            $or: [
              'title', 'kategoria'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        produkts = await Produkt.findAll({
          limit: 10
        })
      }
      res.send(produkts)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the produkts'
      })
    }
  },
  async show (req, res) {
    try {
      const produkt = await Produkt.findById(req.params.produktId)
      res.send(produkt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the produkts'
      })
    }
  },
  async post (req, res) {
    try {
      const produkt = await Produkt.create(req.body)
      res.send(produkt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the produkt'
      })
    }
  },
  async put (req, res) {
    try {
      await Produkt.update(req.body, {
        where: {
          id: req.params.produktId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the produkt'
      })
    }
  },
  async remove (req, res) {
    try {
      const {produktId} = req.params
      const produkt = await Produkt.findOne({
        where: {
          id: produktId
        }
      })
      if (!produkt) {
        return res.status(403).send({
          error: 'you do not have access to this produktb'
        })
      }
      await produkt.destroy()
      res.send(produkt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the produkt'
      })
    }
  }
}
