import React, { createContext, useEffect } from 'react';
import './style.css';

const FormContainer = ({ onSubmit, children }) => {

    const FormContext = createContext()

    const handleFormSubmit = event => {
        event.preventDefault()
        console.log(event);
    }

    useEffect(() => {
        console.log(children)
        console.log(children.map(child => { 
                if (typeof(child.type) === 'function'){
                    return child.type.name
                } else {
                    return child.type
                }
            })
        )
    },[]);

    return (
        <form className='form-container' onSubmit={handleFormSubmit}>
           {children}
        </form>
    )
}

export default FormContainer;