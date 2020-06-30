import React from 'react';
import './style.css';

const Nav = (props) => {
const { position } = props;

    return (
        <nav className={position}>
            <h1>The Employee Page</h1>
        </nav>
    )
}

export default Nav;