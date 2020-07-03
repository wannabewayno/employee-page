import React, { useState } from 'react';
import './style.css';
import { liftUpAll } from './engine'

const FormContainer = ({ onSubmit, children }) => {

    const [ formState, setFormState ] = useState({});

    const handleFormSubmit = event => {
        event.preventDefault()
        onSubmit(formState);
    }
    
    const handleliftup = ({stateName, value}) => {
        formState[stateName] = value;
        setFormState(formState);
    }

    const elements = liftUpAll(children,handleliftup)

    return (
        <form className='form-container' onSubmit={handleFormSubmit}>
            {elements}
        </form>
    )
}

export default FormContainer;