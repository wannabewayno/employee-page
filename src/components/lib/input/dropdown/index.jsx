import React from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ name, options}) => {

    const renderOptions = (options) => {
        return options.map(option => <option value={option} key={uuidv4()}>{option}</option>);
    }

    return (
        <div className='dropdown'>
            <label htmlFor={name}>{name}</label>
            <select name={name}>
                {renderOptions(options)}
            </select>
        </div>
    );
}

export default Dropdown;