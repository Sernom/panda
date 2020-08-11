const jwt = require('jsonwebtoken')
const path = require('path')

const User = require('../model/User')

const checkPassword = require('../library/auth/check-password')
const hashPassword = require('../library/auth/hash-password')

const { loginValidation, registerValidation } = require('../library/auth/validation')


const base = (req, res) => {
	return res.sendFile(path.join(__dirname, '../public/auth/auth-login.html'))
}

const signup = (req, res) => {
	res.sendFile(path.join(__dirname, '../public/auth/auth-signup.html'))
}

const register = async (req, res) => {
	try {
		const { error } = registerValidation(req.body)

		if (error) return res.status(402).send(error.details[0].message)

		const { email, password, name } = req.body

		// Check if the use already exists in database
		const emailExist = await User.findOne({ email })

		if (emailExist) res.status(422).send('Email already exists')

		// Hash password
		const { salt, hash } = hashPassword(password)

		const user = new User({
			email,
			name,
			salt,
			hash
		})

		await user.save()

		res.send({ user: user._id })
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const login = async (req, res) => {
	try {
		const { error } = loginValidation(req.body)
		
		if (error) return res.status(400).send(error.details[0].message)

		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) throw new Error('Email is invalid.')

		if (!(await checkPassword(user, password))) throw new Error('no-auth') 

		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
		res.header('panda-auth', token)
		res.redirect('/auth/settings')

	} catch (e) {
		console.log(e.message)
		if (e.message === 'no-auth') {
			return res.status(401).json({
				error: true,
				name: e.name,
				message: 'Invalid username and/or password'
			})
		}

		res.status(500).json({
			error: true,
			name: e.name,
			message: e.message
		})
	}
}

const logout = (req, res) => {
	res.removeHeader('panda-auth')
	res.redirect('/')
}

const settings = (req, res) => {
	return res.sendFile(path.join(__dirname, '../public/auth/auth-logout.html'))
}

module.exports = { register, login, base, logout, signup, settings }
