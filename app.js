const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const mongooseMorgan = require('mongoose-morgan')
const routes = require('./routes/index')
const { blue, green } = require('chalk')
const { log, error } = console

dotenv.config()

app.set('port', process.env.PORT)

// DB Connection
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => log('🔌' + blue(' Connected to MongoDB'))
)

// Middleware
app.use(express.json())

// Routes Middleware's
app.use('/', routes)

// Error handler
app.use((err, req, res, next) => {
  if (err) error(err)
  next()
})

app.use(
  mongooseMorgan(
    {
      connectionString: process.env.DB_CONNECT,
      collection: 'morganLogs'
    },
    {
      skip: req => {
        const pathArray = req.originalUrl.split('/')
        if (
          pathArray.length > 1 &&
          [
            'fonts',
            'libs',
            'img',
            'js',
            'css',
            'partials',
            'static'
          ].includes(pathArray[1])
        ) {
          return true
        } else {
          return false
        }
      }
    },
    process.env.HOSTs === 'www.skylarthames.com'
      ? 'common'
      : 'dev'
  )
)

app.listen(
	process.env.PORT,
	log(green(`Server up and running on port ${process.env.PORT}`))
)

module.exports = app
