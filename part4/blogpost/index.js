//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
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
logger.info('Connected to db at '+mongoUrl)
mongoose.connect(mongoUrl)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})