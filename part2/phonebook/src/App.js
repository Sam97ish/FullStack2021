import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from'./components/Persons'
import Addforum from './components/AddpersonForm'
import Filter from './components/Filter'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])

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
    let persIndex = personsCp.findIndex((person) => {return person.name === newName})
    if( persIndex > -1){
      //alert(`${newName} already exists!`)
      if(window.confirm(newName + " Already exists, would you like to update their number?")){
        numberService
        .update(persons[persIndex].id, persObject)
        .then(personResponse => 
          setPersons(persons.map(pers => pers.id === personResponse.id ? personResponse : pers)))
      }
    }else{
      numberService
      .create(persObject)
      .then(person => 
        setPersons(persons.concat(person)))
    }

  }

  const handleDelete = (id, name) => {
    if(window.confirm("Would you like to delete " + name+ " ?")){
      numberService
      .remove(id)
      .then(person => console.log(name+" was deleted"))
      setPersons(persons.filter(person => person.id !== id))

    }

  } 

  useEffect(()=>{
      numberService
      .getall()
      .then(response => {
        console.log(response)
        setPersons(response)})
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>

        <Filter search={search} handleSearch={handleSearch}/>

      <h2> Add a new </h2>

      <Addforum AddPerson={AddPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />

      <h2>Numbers</h2>

      <Persons persons={persons} search={search} handleDelete={handleDelete}/>

    </div>
  )
}

export default App