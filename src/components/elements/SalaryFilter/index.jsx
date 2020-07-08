import React, { useState, useEffect } from 'react';
import './style.css';
import InlineContainer from '../../lib/containers/flex/InlineContainer'
import Number from '../../lib/inputs/Number'

function SalaryFilter ({name, handleliftup}) {

    
    const [salaryFilter, setSalaryFilter ] = useState({});

    const handleNumberInput = ({stateName , value}) => {
        setSalaryFilter({...salaryFilter, [stateName]:value});
    }

    useEffect(()=>{
        // makes searchValue available to it's container
        handleliftup({stateName:name.id,value:salaryFilter})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[salaryFilter])

    return (
        <InlineContainer gap='1rem' minWidth='120px'>
            <Number name={{display:'Upper threshold',id:'upper', toDisplay:true}} handleliftup={handleNumberInput}/>
            <Number name={{display:'Lower threshold',id:'lower', toDisplay:true}} handleliftup={handleNumberInput}/>
            <Number name={{display:'Must be',id:'exact', toDisplay:true}} handleliftup={handleNumberInput}/>
        </InlineContainer>
    )
}

export default SalaryFilter