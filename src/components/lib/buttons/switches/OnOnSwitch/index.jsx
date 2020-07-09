import React, { useState, useEffect } from 'react';
import './style.css';
import Switch from '../Switch';

function OnOnSwitch ({ trackColour, sliderColour, textColour, label, getSwitchTarget, children }) {
    
    const options = children.map(child => child);

    if (!getSwitchTarget){
        getSwitchTarget = () => console.warn(
            "OnOnSwitch is not sharing it's target with it's container!",
            "consider adding a 'liftUpState' function to the 'getSwitchTarget' prop")
    }

    const [ currentTarget, setCurrentTarget ] = useState('');

    function switchPosition(position) {
        const target = position === 'left'? children[0] : children[1];
        setCurrentTarget(target);
    }

    useEffect(()=> {
        getSwitchTarget(currentTarget)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentTarget])

    
    return (
        <div className='OnOnSwitch'>
            <div className='switch-container'>
                <span 
                className='option-left'
                style={{color:currentTarget === options[0]? textColour:'hsla(0,0%,50%,0.5)'}}
                >
                    {children[0].props.name.display}
                </span>
                <div className='slider'>
                    <label htmlFor='Switch'>{label}</label>
                    <Switch 
                    getSwitchPosition = {switchPosition}
                    trackColour = {trackColour}
                    sliderColour = {sliderColour}
                    />
                </div>
                <span
                className='option-right'
                style={{color:currentTarget === options[1]? textColour:'hsla(0,0%,50%,0.5)'}}
                >
                    {children[1].props.name.display}
                </span>
            </div>
            <div className='element-container'>
                {currentTarget}
            </div>
        </div>
    )
}

export default OnOnSwitch;