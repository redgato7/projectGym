const Joi = require('joi')

module.exports = {
  register (req, res, next) { // req-żądanie zapytania, res-to co wysylasz, next- odwolywanie sie do sciezek w routes.js
    const schema = { // deklaracja schematu
      email: Joi.string().email(), // ciag znakow, emaila
      password: Joi.string().regex( // ciag znakow
        new RegExp('^[a-zA-Z0-9]{8,32}$') // regex umozliwia wywolanie znakow takich jakie chcemy
      )
    }

    const {error} = Joi.validate(req.body, schema) // uprawomocniamy request body w schemie

    if (error) {
      switch (error.details[0].context.key) { // blad przy emailu lub hasle
        case 'email':
          res.status(400).send({
            error: 'Wprowadź poprawny adres email.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `W haśle mogą znajdować się tylko cyfry i litery. Wymagane jest od 8 do 32 znaków.
            `
          })
          break
        default: // jesli cos innego jest źle
          res.status(400).send({
            error: 'Niestety rejestracja jest niemożliwa, skontaktuj się z supportem.'
          })
      }
    } else {
      next() // jesli wszystko jest spoko przechodzimy dalej
    }
  }
}
