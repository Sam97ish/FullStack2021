import React, { useState } from 'react'
import Persons from'./components/Persons'
import Addforum from './components/AddpersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')

  const [newNumber, setNumber] = useState('')

  const [search, setSearch] = useState('')
  

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  const AddPerson = (event) =>{
    event.preventDefault()
    let persObject = {
      name: newName,
      number: newNumber
    }

    let personsCp = [...persons]
    
    if(personsCp.findIndex((person) => {return person.name === newName}) > -1){
      alert(`${newName} already exists!`)
    }else{
      personsCp = personsCp.concat(persObject)
      setPersons(personsCp)
    }

  }



  return (
    <div>
      <h2>Phonebook</h2>

        <Filter search={search} handleSearch={handleSearch}/>

      <h2> Add a new </h2>

      <Addforum AddPerson={AddPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />

      <h2>Numbers</h2>

      <Persons persons={persons} search={search}/>

    </div>
  )
}

export default App