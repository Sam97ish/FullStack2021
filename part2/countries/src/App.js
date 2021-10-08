import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Result from './components/Result';



function App() {

  const [search, setSearch] = useState('')

  const [countries, setCountries] = useState([])


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(()=>{
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        
        setCountries(response.data)
        //console.log(countries)
      })
  }, [])

/*
  useEffect(()=>{
    let sec = selected
    setSelected('')

    let candidateCountry = countries.filter(country => country.name.common.toLowerCase().match(sec.toLowerCase()))

    setView(<CountryView country={candidateCountry[0]} />)
        
  }, [selected])
*/


  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <Result search={search} countries={countries} setSearch={setSearch}/>
    </div>
  );
}

export default App;
