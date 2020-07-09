import React from 'react';
import './style.css';
import getColour from './getColour'

const Employee = ({ data }) => {
const { name, role, email, department, salary, image, roleColour } = data;
const tabColour = getColour(salary)
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
                    <div className='colourTab' style={{backgroundColor:tabColour}}></div>
                </main>  
            </main>
            <h6 className='title' style={{backgroundColor:roleColour}}>{role}</h6>
        </li>
    )
}

export default Employee