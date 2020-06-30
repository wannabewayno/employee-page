import React from 'react';
import './style.css';

const Employee = props => {
const { name, role, email, department, phone, image } = props.employee;

    return (
        <li className='listEmployee'>
            <img src={image} alt={`${name}`}/>
            <h6>{name}</h6>
            <h6>role: {role}</h6>
            <h6>email: {email}</h6>
            <h6>department: {department}</h6>
            <h6>extension: {phone}</h6>
        </li>
    )
}

export default Employee