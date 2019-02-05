const {
  DietHistorie,
  Diet
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const diethistories = await DietHistorie.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Diet
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .map(diethistorie => diethistorie.toJSON())
        .map(diethistorie => _.extend(
          {},
          diethistorie.Diet,
          diethistorie
        ))
      res.send(_.uniqBy(diethistories, diethistorie => diethistorie.DietId))
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the diethistorie'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {dietId} = req.body
      const diethistorie = await DietHistorie.create({
        DietId: dietId,
        UserId: userId
      })
      res.send(diethistorie)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the diethistorie object'
      })
    }
  }
}
