const {User} = require('../models') // folder models
const jwt = require('jsonwebtoken')
const config = require('../config/config') // folder config, plik config.js

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7 // 60secs, 60mins, 24h, 7daysperweek
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) { // metoda rejestracja
    try { // jesli sie uda tworzy uzytkownika
      const user = await User.create(req.body) // tworzenie nowego uzytkownika
      const userJson = user.toJSON()
      res.send({
        user: userJson, // user do bazy danych
        token: jwtSignUser(userJson) // zwraca jwt Token, który zawiera informacje o uzytkowniku
      })
    } catch (err) { // jesli nie da sie dodac emaila do bazy danych, bo juz istnieje wyswietla error
      res.status(400).send({
        error: 'Ten adres email jest już w użyciu.'
      })
    }
  },
  async login (req, res) { // metoda login
    try {
      const {email, password} = req.body // pobiera email i haslo
      const user = await User.findOne({ // szuka uzytkownika w bazie danych
        where: {
          email: email // gdzie email podany jest taki sam jak w bazie danych
        }
      })

      if (!user) { // jesli nie ma takiego emailu w bazie danych
        return res.status(403).send({
          error: 'Nie znaleziono takiego adresu email.'
        })
      }

      const isPasswordValid = await user.comparePassword(password) // jesli jest email, ale haslo sie nie zgadza
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Wprowadzono niepoprawne hasło.'
        })
      }

      const userJson = user.toJSON() // loguje
      res.send({
        user: userJson,
        token: jwtSignUser(userJson) // zwraca jwt Token, który zawiera informacje o uzytkowniku
      })
    } catch (err) { // error ktorego nie przewidziano
      res.status(500).send({
        error: 'Wystąpił błąd podczas próby zalogowania.'
      })
    }
  }
}
