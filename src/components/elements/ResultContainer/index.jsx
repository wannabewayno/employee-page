import React, { cloneElement, useState, useEffect } from 'react';
import './style.css';

const ResultContainer = ({ results, children, liftUpState }) => {

    const errorInfo = 'The ResultContainer should wrap a template component used to render the data it receives'
    if (!children) {
        console.error('No template component detected!:', errorInfo)
    }
    if (children.length > 1){
        console.error('Too many child elements in the ResultContainer:', errorInfo)
    }

    const [data, setData] = useState(results);

    useEffect(()=>liftUpState(data,setData),[]);
    useEffect(() => setData(results),[results]);
    useEffect(() => console.log(data),[data]);

    return (
        <section className='ResultContainer'>
            <ul>
                {data.map(dataItem => cloneElement(children,{ data:dataItem, key: dataItem.id }))}
            </ul>
        </section>
    )
}

export default ResultContainer;