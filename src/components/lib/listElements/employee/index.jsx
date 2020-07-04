import React from 'react';
import './style.css';

const Employee = ({ data }) => {
const { name, role, email, department, phone, image } = data;

    return (
        <li className='listEmployee'>
            <main>
            	<main>
                    <img src={image} alt={`${name}`}/>
                    <section>
                        <h6 className='name'>{name}</h6>
                        <hgroup>
                            <h6>Department: {department}</h6>
                            <h6>Email: {email}</h6>            	    	
                            <h6>Extension: {phone}</h6>
                        </hgroup>  
                    </section>
                    <div className='colourTab'></div>
                </main>  
            </main>
            <h6 className='title'>{role}</h6>
        </li>
    )
}

export default Employee