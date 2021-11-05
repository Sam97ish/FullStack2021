//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.mologger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(logger.info('Connected to db at '+mongoUrl)).catch(err => {
  console.error('Error connecting to mongo', err)
})

module.exports = app