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
        <div className='SalaryFilter'>
            <InlineContainer gap='1rem' minWidth='120px'>
                <Number name={{display:'Salary Under',id:'upper', toDisplay:true}} handleliftup={handleNumberInput}/>
                <Number name={{display:'Salary Above',id:'lower', toDisplay:true}} handleliftup={handleNumberInput}/>
                <Number name={{display:'Salary must be',id:'exact', toDisplay:true}} handleliftup={handleNumberInput}/>
            </InlineContainer>
        </div>
    )
}

export default SalaryFilter