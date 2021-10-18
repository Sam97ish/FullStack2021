const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.w42vi.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length > 3) {
    const person = new Person({
        id: Math.floor(Math.random()*1000),
        name: process.argv[3],
        number: process.argv[4],
      })
      
    person.save().then(result => {
        console.log('person saved! ' +  result)
        mongoose.connection.close()
    })
}else{
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
    })
}

