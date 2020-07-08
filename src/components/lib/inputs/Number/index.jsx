import React, { useState, useEffect } from 'react';
import './style.css'; 

const Number = ({ name, handleliftup }) => {
    
    if (!handleliftup){
        handleliftup = () => console.warn(
            "SearchBar is not sharing it's state with the container!",
            "Can't use a form component not wrapped by a FormContainer.",
            "Consider wrapping SearchBar in a FormContainer.")
    }

    const [numberValue, setNumberValue ] = useState('');

    const handleNumberInput = event => {
        const value = event.target.value
        setNumberValue(value);
    }

    useEffect(()=>{
        // makes searchValue available to it's container
        handleliftup({stateName:name.id,value:numberValue})
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => handleliftup({stateName:name.id,toDelete:true})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numberValue])

    return(
        <div className='Number'>
            {name.toDisplay?<label>{name.display}</label>:null}
            <input type='number' value={numberValue} placeholder="input a number..." onChange={handleNumberInput} />
        </div>
    );
}

export default Number;