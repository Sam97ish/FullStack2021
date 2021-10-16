import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return(
      <ul>
          {props.persons.filter(person => person.name.toLowerCase().match(props.search.toLowerCase())).map(pers => 
            <Person key={pers.id} person={pers} handleDelete={props.handleDelete} />
            )
          } 
      </ul>
    )
  }

  export default Persons