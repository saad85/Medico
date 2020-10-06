import React, { useState,useEffect } from "react";

export default function SearchSection(props){
    const [value, setValue] = useState('');

    function setValueAndUpdateParent(e){
        
        setValue(e.target.value);

        if(props && props.updateparentComponent) props.updateparentComponent(e.target.value)
    }

    return (
        <div className="wrap">
            <div className="search-text"><h3>Search and book Appoinment with your desired Doctor.</h3></div>
             <div className="search">
                <input type="text" className="searchTerm" placeholder="Search doctor by name" onChange={(e) => setValueAndUpdateParent(e)} value={value}/>
                <button type="submit" className="searchButton">
                <i className="fa fa-search" aria-hidden="true"></i>
               </button>
             </div>
          </div>
    );
}