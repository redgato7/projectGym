const {
  DietBookmark,
  Diet
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {dietId} = req.query
      const where = {
        UserId: userId
      }
      if (dietId) {
        where.DietId = dietId
      }
      const dietbookmarks = await DietBookmark.findAll({
        where: where,
        include: [
          {
            model: Diet
          }
        ]
      })
        .map(dietbookmark => dietbookmark.toJSON())
        .map(dietbookmark => _.extend(
          {},
          dietbookmark.Diet,
          dietbookmark
        ))
      res.send(dietbookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the dietbookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {dietId} = req.body
      const dietbookmark = await DietBookmark.findOne({
        where: {
          DietId: dietId,
          UserId: userId
        }
      })
      if (dietbookmark) {
        return res.status(400).send({
          error: 'you already have this set as a dietbookmark'
        })
      }
      const newDietBookmark = await DietBookmark.create({
        DietId: dietId,
        UserId: userId
      })
      res.send(newDietBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the dietbookmark'
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {dietbookmarkId} = req.params
      const dietbookmark = await DietBookmark.findOne({
        where: {
          id: dietbookmarkId,
          UserId: userId
        }
      })
      if (!dietbookmark) {
        return res.status(403).send({
          error: 'you do not have access to this dietbookmark'
        })
      }
      await dietbookmark.destroy()
      res.send(dietbookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the dietbookmark'
      })
    }
  }
}
