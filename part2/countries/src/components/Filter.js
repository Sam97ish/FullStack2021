import React from "react";

const FiltreForm = (props) => {
    return(
        <form>
        <div>
          Find countries: <input type="search" 
          value={props.search}
          onChange={props.handleSearch}
          />
        </div>
      </form>
    )
}

export default FiltreForm