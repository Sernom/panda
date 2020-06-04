const router = require('express').Router()
const path = require('path')
const {something} = require('../controllers/home')

router.get('/', something)

module.exports = router