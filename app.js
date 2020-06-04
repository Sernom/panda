const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const { green, blue } = require('chalk')
const { log, error } = console

dotenv.config()
 
// Use RGB colors in terminal emulators that support it.
// log(chalk.keyword('orange')('Yay for orange colored text!'))
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'))
// log(chalk.hex('#DEADED').bold('Bold gray!'))

app.set('port', 7000) // Set application port to listen on

// DB Connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => log('🔌' + blue(' Connected to MongoDB')))


// Middleware
app.use(express.json())

// Routes Middlewares
app.use('/', routes)

app.use((err, req, res, next) => {
  if (err) error(err)
  next()
})

app.listen(7000, () => log('🏃‍♂️' + green(' Server up and running')))

module.exports = app