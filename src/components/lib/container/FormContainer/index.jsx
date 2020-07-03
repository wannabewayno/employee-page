import React, { useState } from 'react';
import './style.css';
import { liftUpAll } from './engine'

const FormContainer = ({ onSubmit, children }) => {

    const [ formState, setFormState ] = useState({});

    const handleliftup = ({stateName, value}) => {
        formState[stateName] = value;
        setFormState(formState);
    }
    
    const [ formElements ] = useState(liftUpAll(children,handleliftup))

    const handleFormSubmit = event => {
        event.preventDefault()
        onSubmit(formState);
    }

    return (
        <form className='form-container' onSubmit={handleFormSubmit}>
            {formElements}
        </form>
    )
}

export default FormContainer;