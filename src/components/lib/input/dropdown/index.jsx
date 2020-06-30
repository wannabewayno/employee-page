import React from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = props => {


    const renderOptions = (options) => {
        return options.map(option => <option value={option} key={uuidv4()}>{option}</option>);
    }

    return (
        <select>
            {renderOptions(props.options)}
        </select>
    );
}

export default Dropdown;