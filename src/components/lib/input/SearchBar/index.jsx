import React, { useState } from 'react';
import './style.css'; 

const SearchBar = ({ liftUpValue }) => {

    const [searchValue, setSearchValue ] = useState('');

    const handleSearchInput = event => {
        const value = event.target.value
        setSearchValue(value);
        liftUpValue(value);
    }

    return (
        <div className='search-bar'>
            <input type='text' value={searchValue} placeholder="search..." onChange={event => handleSearchInput(event)} />
            <div>
                <img src="./images/icons/magnifying-glass.png" alt="search-icon"/>
            </div>
        </div>
    );
}

export default SearchBar;