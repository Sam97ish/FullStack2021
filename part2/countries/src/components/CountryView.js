import React from "react";
import Weather from "./Weather";

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


            <img src={String(props.country.flags.svg)} alt="FlagIcon"  width='200' height='200' />

            <Weather country={props.country} />

        </div>
    )
}

export default CountryView