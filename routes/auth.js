const router = require('express').Router()
const { register, login, logout, base, signup, settings } = require('../controllers/auth')
const verify = require('../library/verifyToken')

router.get('/', base)
router.get('/signup', signup)
router.get('/settings', verify, settings)

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router