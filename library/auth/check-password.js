const crypto = require('crypto')

const {
  iterations,
  stringType,
  keylen,
  digest
} = require('../../config/secrets.json').password

const checkPassword = async (user, password) => {
  const { hash, salt } = user

  return (
    hash === crypto
      .pbkdf2Sync(password, salt, iterations, keylen, digest)
      .toString(stringType)
  )
}

module.exports = checkPassword