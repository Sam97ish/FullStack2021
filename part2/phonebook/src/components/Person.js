import React from 'react'

const Person = (props) => {
    return(
        <>
            <li key={props.person.name}id={props.person.id}> {props.person.name} {props.person.number}  </li> 
            <button onClick={()=> props.handleDelete(props.person.id, props.person.name)}> Delete </button>
        </>
    )
}

export default Person