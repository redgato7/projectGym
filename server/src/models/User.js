const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) // szyfrowanie

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null)) // bierze haslo, koduje i zapisuje
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // definicja użytkownika
    email: { // musi podac email
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING // oraz haslo
  }, {
    hooks: { // hashPassword metoda wyzej
      beforeCreate: hashPassword, // tworzenie obiektu
      beforeUpdate: hashPassword, // update obiektu
      beforeSave: hashPassword // zapisanie obiektu
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}
