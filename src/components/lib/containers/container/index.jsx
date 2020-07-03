import React from 'react';
import './style.css';

const Container = ({ children }) => {

    return (
        <section className='Container'>
            {children}
        </section>
    )
}

export default Container;