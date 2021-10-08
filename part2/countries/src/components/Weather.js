import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
    const [weather, setWeather] = useState([])
    const [fetchedData, setFetchedData] = useState(false)
    
    useEffect(()=>{
        const api_key = process.env.REACT_APP_API_KEY

        let  link = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`
        console.log('effectWeather')
        axios
          .get(link)
          .then(response => {
            console.log('promise fulfilled Weather') 
            setWeather(response.data.current)
            setFetchedData(true)
           
          })
          .catch(response => {
            return(
                <div>
                    Was not able to fetch weather data.
                    Response:
                    {response.data}
                </div>
            )
          })
      }, [props.country.capital])

      if(fetchedData){
        return(
            <div>
                <h1>Weather in {props.country.capital}</h1>
                <p>Temprature:  {weather.temperature} Celsius</p>
                <img src={weather.weather_icons[0] } alt="weather icon"/>
                <p>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
            </div>
        )
      }else{
        return(
            <div>
                Fetching weather data...
            </div>
        )
      }

}

export default Weather