import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    let persObject = {
      name: newName
    }

    let personsCp = [...persons]
    
    if(personsCp.findIndex((person) => {return person.name === newName}) > -1){
      alert(`${newName} already exists!`)
    }else{
      personsCp = personsCp.concat(persObject)
      setPersons(personsCp)
    }

  }

  const Person = (props) => {
    return(
      <>
          {props.persons.map(person => 
            <p key={person.name}> {person.name} </p>)} 
      </>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleName}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Person persons={persons}/>
    </div>
  )
}

export default App