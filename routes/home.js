const router = require('express').Router()
const { comingSoon } = require('../controllers/home')

router.get('/', comingSoon)

module.exports = router