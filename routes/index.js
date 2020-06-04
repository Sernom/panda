const router = require('express').Router()
const verify = require('../library/verifyToken')
const homeRoute = require('./home.js')
const authRoute = require('./auth')



router.use('/home', verify, homeRoute)
router.use('/auth', authRoute)

module.exports = router