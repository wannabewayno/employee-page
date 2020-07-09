import React, { useState } from 'react';
import LinkContainer from '../../../LinkContainer'
import './style.css'

/**
 * A jumobtron that takes up the entire screen on mounting
 * clicking a dismiss button will turn the jumobtron into a nav with provided links
 */
function Navatron({children, title, subtext, buttonText, isDismissed, onClick }) {

    // const [isDismissed, setIsDismissed ] = useState(false);
    const height = isDismissed?'10vh':'100vh';
    const fontSize = isDismissed?'200%':'8vw'

    return (
    <nav className='Navatron' style={{ height }}>
        <div>
            <h1 style={{fontSize}}>{title}</h1>
            {isDismissed?undefined:<small>{subtext}</small>}
            {isDismissed?undefined:
            <button onClick={onClick}>
                <span>{buttonText}</span>
                <img src='./images/icons/arrow.png'></img>
            </button>}
        </div>
        {isDismissed&&children?<LinkContainer>{children}</LinkContainer>:undefined}
    </nav>
    )
}

export default Navatron;