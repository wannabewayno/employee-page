import React from 'react';
import './style.css';

const Employee = ({ data }) => {
const { name, role, email, department, salary, image } = data;

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
                            <h6>Salary: ${salary}</h6>
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