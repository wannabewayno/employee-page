import React, { useState, useEffect } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ name, options, handleliftup, constructValue }) => {
    
    if(!constructValue) constructValue = value => value;

    if (!handleliftup){
        handleliftup = () => console.warn(
            "SearchBar is not sharing it's state with the container!",
            "Can't use a form component not wrapped by a FormContainer.",
            "Consider wrapping SearchBar in a FormContainer.")
    }

    const [ dropDownValue, setdropDownValue ] = useState(constructValue(options[0],name))

    useEffect(()=>{
        handleliftup({stateName:name.id,value:dropDownValue})
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => handleliftup({stateName:name.id,toDelete:true})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dropDownValue])
    
    const handleChange = event => {
        setdropDownValue(event.target.value)
    }

    return (
        <div className='dropdown'>
            <label htmlFor={name}>{name.display}</label>
            <select name={name.id} value={dropDownValue} onChange={handleChange}>
                {options.map( option => { 
                    return <option value={constructValue(option,name)} key={uuidv4()}>{option.display}</option>
                    })
                }
            </select>
        </div>
    );
}

export default Dropdown;