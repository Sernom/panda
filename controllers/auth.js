const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../library/validation')

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validate data
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)
    
        // Check if the use already exists in database
        const emailExist = await User.findOne({email})
    
        if (emailExist) return res.status(400).send('Email already exists')

        // Hash password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)

        const user = new User(req.body)
    
        await user.save()
    
        res.send({ user: user._id })
    } catch (e) {
        res.status(400).send(e)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validate data
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({email})
    
        if (!user) return res.status(400).send('Email is wrong!')

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return res.status(400).send('Invalid password!')

        // Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('panda-auth', token).send(token)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = { register, login }