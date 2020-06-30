import React from 'react';
import './style.css';
import Dropdown from '../../lib/input/dropdown'

const FormContainer = (props) => {

    const filterOptions = ['option1','option2','option3','option4'];
    const sortOptions = ['name','occupation','phone number'];

    return (
        <form>
            <input type="text"/>
            <Dropdown options={filterOptions}/>
            <Dropdown options={sortOptions}/>
        </form>
    )
}

export default FormContainer;