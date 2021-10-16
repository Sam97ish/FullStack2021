import React from "react";

const Addforum = (props) => {
    return(
        <form onSubmit={props.AddPerson}>
        <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handleName}
                />
          number: <input 
                value={props.newNumber}
                onChange={props.handleNumber}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default Addforum