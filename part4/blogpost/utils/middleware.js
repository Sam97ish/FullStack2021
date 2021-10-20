var morgan = require('morgan')

morgan.token('content', function getContent (req) {
  return JSON.stringify(req.body)
})
const mologger = morgan(':method :url :response-time :content')
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  mologger,
  unknownEndpoint,
  errorHandler
}