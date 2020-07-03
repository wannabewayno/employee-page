import React, { cloneElement } from 'react';
import './style.css';

const ResultContainer = ({ data, children }) => {

    const errorInfo = 'The ResultContainer should wrap a template component used to render the data it receives'
    if (!children) {
        console.error('No template component detected!:', errorInfo)
    }
    if (children.length > 1){
        console.error('Too many child elements in the ResultContainer:', errorInfo)
    }

    /**
     * Generates a React element list from an array of data
     * @param {Array} data 
     */
    const renderData = data => {
        return data.map(data => {
           return cloneElement(children,{ employee: data, key: data.id })
        })
    }

    return (
        <section className='ResultContainer'>
            <ul>
                {renderData(data)}
            </ul>
        </section>
    )
}

export default ResultContainer;