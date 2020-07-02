import React from 'react';
import './style.css';
import Employee from '../../lib/listElements/employee'

const ResultContainer = props => {
    /**
     * Generates a list from an array of data
     * @param {Array} results 
     */
    const renderResults = results => {
        return results.map(data => <Employee employee={data} key={data.id}/>)
    }

    return (
        <section className='resultContainer'>
            <ul>
                {renderResults(props.data)}
            </ul>
        </section>
    )
}

export default ResultContainer;