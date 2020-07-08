import React, { useState, useEffect } from 'react';
import './style.css';

function Switch ({ trackColour, sliderColour, getSwitchPosition}) {

    const [ switchPosition, setSwitchPosition ] = useState('0%');

    function toggleSwitch(){
        const newPosition = switchPosition === '0%'? '100%':'0%';
        setSwitchPosition(newPosition);
    }

    useEffect(() => {
        const position = switchPosition === '0%'? 'left':'right'  
        getSwitchPosition(position);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[switchPosition])

    return (
        <button type="button" className='Switch medium'>
            <div className="track" style={{ backgroundColor:trackColour }} ></div>
            <div className="slider" style={{ backgroundColor:sliderColour, left:switchPosition }} onClick={toggleSwitch}></div>
        </button>
    )
}

export default Switch;