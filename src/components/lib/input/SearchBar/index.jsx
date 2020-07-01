import React, { useState } from 'react';
import './style/css';

const SearchBar = props => {
    const [searchValue, setSearchValue ] = useState('');

    const handleSearchInput = event => {
        setSearchValue(event.target.value);
    }

    return (
        <fieldset className='SearchBar'>
            <img src="./magnifying-glass.png" alt=""/>
            <input type='text' value={searchValue} onChange={event => handleSearchInput(event)} />
        </fieldset>
    );
}

export default SearchBar;