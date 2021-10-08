import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from'./components/Persons'
import Addforum from './components/AddpersonForm'
import Filter from './components/Filter'


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
    
    if(personsCp.findIndex((person) => {return person.name === newName}) > -1){
      alert(`${newName} already exists!`)
    }else{
      personsCp = personsCp.concat(persObject)
      setPersons(personsCp)
    }

  }


  useEffect(()=>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        let persCP = [...persons]
        setPersons(()=> {return [...persCP].concat(response.data)})
      })
  }, [])



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