const router = require('express').Router()
const verify = require('../library/verifyToken')
const home = require('./home')
const auth = require('./auth')
const base = require('./base')


router.use('/', base)
router.use('/home', verify, home)
router.use('/auth', auth)

module.exports = router