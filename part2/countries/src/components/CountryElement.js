import React from "react";

const CountryElement = (props)=> {
    return(
        <li> {props.country.name.common} </li>
    )
}

export default CountryElement