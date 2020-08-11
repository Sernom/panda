const crypto = require('crypto')
const {
  randomBytes,
  stringType,
  iterations,
  keylen,
  digest
} = require('../../config/secrets').password

const hashPassword = password => {
  const salt = crypto.randomBytes(randomBytes).toString(stringType)
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString(stringType)

  return {
    salt,
    hash
  }
}

module.exports = hashPassword