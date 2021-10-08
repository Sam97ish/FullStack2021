import React from "react";
import CountryElement from "./CountryElement";

const CountryList = (props) => {
    return(
        <ul>
            {props.countryls.map(country => 
                <CountryElement key={country.name.common}country={country}/>
            )}
        </ul>
    )
}

export default CountryList