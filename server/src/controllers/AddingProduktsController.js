const {AddingProdukt} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let addingprodukts = null
      const search = req.query.search
      if (search) {
        addingprodukts = await AddingProdukt.findAll({
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
        addingprodukts = await AddingProdukt.findAll({
          limit: 10
        })
      }
      res.send(addingprodukts)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the addingprodukts'
      })
    }
  },
  async show (req, res) {
    try {
      const addingprodukt = await AddingProdukt.findById(req.params.addingproduktId)
      res.send(addingprodukt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the addingprodukts'
      })
    }
  },
  async post (req, res) {
    try {
      const addingprodukt = await AddingProdukt.create(req.body)
      res.send(addingprodukt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the addingprodukt'
      })
    }
  },
  async put (req, res) {
    try {
      await AddingProdukt.update(req.body, {
        where: {
          id: req.params.addingproduktId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the addingprodukt'
      })
    }
  },
  async remove (req, res) {
    try {
      const {addingproduktId} = req.params
      const addingprodukt = await AddingProdukt.findOne({
        where: {
          id: addingproduktId
        }
      })
      if (!addingprodukt) {
        return res.status(403).send({
          error: 'you do not have access to this addingproduktb'
        })
      }
      await addingprodukt.destroy()
      res.send(addingprodukt)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the addingprodukt'
      })
    }
  }
}
