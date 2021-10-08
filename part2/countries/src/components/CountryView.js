import React from "react";

const CountryView = (props) => {
    return(
        <div>
            <h1> {props.country.name.common}</h1>
            <ul> Capital: 
                {props.country.capital.map(city => <li key={city}> {city} </li>)}
            </ul>
            <p>Region: {props.country.region}</p>
            <p>Population: {props.country.population}</p>
            
            <h1>
                Languages:
            </h1>
            <ul>
                {Object.values(props.country.languages).map(lang => <li key={lang}> {lang} </li>)}
            </ul>

        </div>
    )
}

export default CountryView