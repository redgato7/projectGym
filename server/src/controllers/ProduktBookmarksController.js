const {
  ProduktBookmark,
  Produkt
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {produktId} = req.query
      const where = {
        UserId: userId
      }
      if (produktId) {
        where.ProduktId = produktId
      }
      const produktbookmarks = await ProduktBookmark.findAll({
        where: where,
        include: [
          {
            model: Produkt
          }
        ]
      })
        .map(produktbookmark => produktbookmark.toJSON())
        .map(produktbookmark => _.extend(
          {},
          produktbookmark.Produkt,
          produktbookmark
        ))
      res.send(produktbookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the produktbookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {produktId} = req.body
      const produktbookmark = await ProduktBookmark.findOne({
        where: {
          ProduktId: produktId,
          UserId: userId
        }
      })
      if (produktbookmark) {
        return res.status(400).send({
          error: 'you already have this set as a produktbookmark'
        })
      }
      const newProduktBookmark = await ProduktBookmark.create({
        ProduktId: produktId,
        UserId: userId
      })
      res.send(newProduktBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the produktbookmark'
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {produktbookmarkId} = req.params
      const produktbookmark = await ProduktBookmark.findOne({
        where: {
          id: produktbookmarkId,
          UserId: userId
        }
      })
      if (!produktbookmark) {
        return res.status(403).send({
          error: 'you do not have access to this produktbookmark'
        })
      }
      await produktbookmark.destroy()
      res.send(produktbookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the produktbookmark'
      })
    }
  }
}
