import React, { cloneElement, useState, useEffect } from 'react';
import './style.css';

/**
 * A contianer that renders a list of data
 * @param {Object} props - Passed down through props
 * @param {Object} props.results       - an array of values/objects from an API call or generation function
 * @param {Object} props.children      - The template component to render the data with matching data keys
 * @param {Object} [props.liftUpState] - a function that lift's up the containers data state and setData attributes.
 */
const ResultContainer = ({ results, children, liftUpState }) => {

    const errorInfo = 'The ResultContainer should wrap a template component used to render the data it receives'
    if (!children) {
        console.error('No template component detected!:', errorInfo)
    }
    if (children.length > 1){
        console.error('Too many child elements in the ResultContainer:', errorInfo)
    }

    const [data, setData] = useState(results);

<<<<<<< HEAD
    useEffect(()=>liftUpState(data,setData),[]);
    // useEffect(() => setData(results),[results]);
    // useEffect(() => console.log(data),[data]);
=======
    //we're using the liftUpState function make the setData function available to App.js
    useEffect(() => {
        // if a liftUpState function was passed as a prop, call it
        if(liftUpState){
            liftUpState(data,setData)
        }
        //other wise do nothing, it won't break anything
    },[]);
   
>>>>>>> bb48eff60a8d284f5a38fb779675e9a3b042264f

    return (
        <section className='ResultContainer'>
            <ul>
                {data.map(dataItem => cloneElement(children,{ data:dataItem, key: dataItem.id }))}
            </ul>
        </section>
    )
}

export default ResultContainer;