require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('content', function getContent (req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :response-time :content'))

// eslint-disable-next-line no-unused-vars
let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res,next) => {
  Person.count({})
    .then(number => {
      let responseInfo = `<h1>Phone book has info for ${number} persons</h1> <h1> ${new Date()}</h1>`
      res.send(responseInfo)
    })
    .catch(error => next(error))

})

app.get('/api/persons', (req, res) => {

  Person.find({}).then(persons => {
    res.json(persons)
  })

})

const generateId = () => {
  //random id.
  let id = Math.floor(Math.random() * 10000)
  return id
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  /*
  let isExists = persons.find(person=> person.name === body.name)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number are missing'
    })
  }
  if(isExists){
    return response.status(400).json({
        error: 'name must be unique'
      })
  }
*/
  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  /*
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
*/

})

app.put('/api/persons/:id',  (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }


  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      person.remove()
        .then(deletedPerson => {
          console.log('Deleted: ' + deletedPerson)
          response.status(204).end()
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)