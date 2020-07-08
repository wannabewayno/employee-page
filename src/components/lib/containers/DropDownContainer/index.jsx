import React, { useState } from 'react';
import './style.css';

/**
 * Conditionaly renders children from a dropdown menu with the children's display name attributes
 * @param {Object} props  
 * @param {Array}  props.children - The components/elements that the container wraps  
 * @param {Array}  props.options  - options to display in the drop-down menu
 */
function DropDownContainer ({name, children, options }) {

    const [ currentDropdown, setCurrentDropdown ] = useState(children[0])

    function handleOnChange(event){
        const id = event.target.value
        setCurrentDropdown(children.find(child => child.props.name.id === id ))
    }

    return (
        <section className='DropDownContainer'>
            {name.toDisplay?<label>{name.display}</label>:null}
            <select value={currentDropdown.props.name.id} onChange={handleOnChange}>
                {options.map(option => { return (
                    <option 
                    value={option.value}
                    key={option.value}>
                        {option.display}
                    </option>)})}
            </select>
            <div>
                {currentDropdown}
            </div>
        </section>
    )

}

export default DropDownContainer