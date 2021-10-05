import React from "react";

const Filter = (props) => {
    return(
        <form>
        <div>
          Search: <input type="search" 
          value={props.search}
          onChange={props.handleSearch}
          />
        </div>
      </form>
    )
}

export default Filter