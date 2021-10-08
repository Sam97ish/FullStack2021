import React from "react";

const CountryElement = (props)=> {
    return(
        <>
            <li> {props.country.name.common} </li> <button onClick={()=> props.setSearch(props.country.name.common)}>Show</button>
        </>
    )
}

export default CountryElement