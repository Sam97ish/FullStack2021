import React from "react";
import CountryView from "./CountryView";
import CountryList from "./CountryList";

const Result = (props) => {
    let candidateList = props.countries.filter(country => country.name.common.toLowerCase().match(props.search.toLowerCase()))

    if(candidateList.length === 1){
        
        return(
        <CountryView country={candidateList[0]}/>
        )

    }else if(candidateList.length <= 10){
        return(
            <CountryList countryls={candidateList}/>
            )

    }else{
        return(
            <div>
                Too many results, be more specific.
            </div>
        )
    }

}

export default Result