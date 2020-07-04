import React, { useState, useEffect } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ name, options, handleliftup }) => {
    
    if (!handleliftup){
        handleliftup = () => console.warn(
            "SearchBar is not sharing it's state with the container!",
            "Can't use a form component not wrapped by a FormContainer.",
            "Consider wrapping SearchBar in a FormContainer.")
    }

    const [ dropDownValue, setdropDownValue ] = useState(options[0].value)

    useEffect(()=>{
        handleliftup({stateName:name,value:dropDownValue})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dropDownValue])
    


    const handleChange = event => {
        setdropDownValue(event.target.value)
    }

    return (
        <div className='dropdown'>
            <label htmlFor={name}>{name}</label>
            <select name={name} value={dropDownValue} onChange={handleChange}>
                {options.map(({display, value}) => { 
                    return <option value={value} key={uuidv4()}>{display}</option>
                    })
                }
            </select>
        </div>
    );
}

export default Dropdown;