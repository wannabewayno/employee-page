import React, { useState, useEffect } from 'react';
import Navatron from './components/lib/containers/nav/NavContainer/Navatron';
import FormContainer from './components/lib/containers/FormContainer';
import Dropdown from './components/lib/inputs/Dropdown';
import ResultContainer from './components/lib/containers/ResultContainer';
import InlineContainer  from './components/lib/containers/flex/InlineContainer';
import SearchBar from './components/lib/inputs/SearchBar';
import Container from './components/lib/containers/container';
import { generateData } from './db/data';
import Employee from './components/lib/listElements/employee';
import { useArrange } from './db/sortAndFilterData.js'
import constructConditions from'./db/constructConditions';
import OnOnSwitch from './components/lib/buttons/switches/OnOnSwitch';
import DropDownContainer from './components/lib/containers/DropDownContainer';
import { OnOnSwitchOptions, sortDropDownOptions, isAscendingDropDownOptions, filterDropDownOptions } from './lib/formOptions';
import SalaryFilter from './components/elements/SalaryFilter';
import findDataOfType from './db/findDataOfType';

function App() {

  // initial employees with a generated array
  const [ employees ] = useState(generateData(20));

  // stores the filtered employees after a user performs a query
  const [ filteredEmployees, setFilteredEmployees ] = useState([...employees])

  // define a state to control all liftedUpStates from child containers
  const [ liftedStates, setLiftedStates ] = useState({});

  // states for roles and departments to be handled to dropdowns
  const [ roles, setRoles ] = useState( findDataOfType(employees,'role') );
  const [ departments, setDepartments ] = useState( findDataOfType(employees,'department') );

  // a state to dismiss the Navatron and render the rest of the application
  const [ isDismissed, setIsDismissed ] = useState(false);

  // call upon a custom hook to sort data
  const arrangeData = useArrange()

  //define from submit
  function formSubmit(formState){

    const { sortConditions, filterConditions } = constructConditions(formState);
    const filteredAndSortedData = arrangeData([...employees], sortConditions, filterConditions );

    setRoles( findDataOfType(filteredAndSortedData,'role') );
    setDepartments( findDataOfType(filteredAndSortedData,'department') );
    setFilteredEmployees(filteredAndSortedData)

    liftedStates.setResultContainerData(filteredAndSortedData);
  }

  function reset(liftedStates){
    setFilteredEmployees([...employees]);
    liftedStates.setResultContainerData([...employees]);
  }

  function constructFilterValue(option, name){
    return JSON.stringify({ category: name.id, type:option.value });
  }

  const constructSortValue = option => option.value

  // define a liftUpState function for the ResultContainer
  function liftUpState(stateName,stateValue,setStateFunction){
    const setStateFunctionName = `set${stateName.slice(0,1).toUpperCase()}${stateName.slice(1)}`
    setLiftedStates({
      ...liftedStates,
      [stateName]:stateValue,
      [setStateFunctionName]:setStateFunction
    });
  }

  // dismisses navatron and renders the rest of the application
  function dismissNavatron(){
    setIsDismissed(true);
  }

  return (
    <main>
      <Navatron
      title='The Employee Page'
      subtext='All your employees, all in one place'
      buttonText='View Employees'
      isDismissed={isDismissed}
      onClick={dismissNavatron}/>
      {isDismissed?
      <div>
        <Container>
        	<FormContainer onSubmit={formSubmit}>
  
            <OnOnSwitch
            options = {OnOnSwitchOptions}>
  
              <SearchBar name={{id:'query', display:'Filter by keyword', toDisplay:false}}/>
              <DropDownContainer name={{id:'dropDown container',display:'Filter by category'}} options={filterDropDownOptions}>
                <Dropdown 
                  options={roles.map(role => { return { value:role, display:role } })}
                  name={{id:'role',display:'filter by job title'}}
                  constructValue={constructFilterValue}
                />
  
                <Dropdown 
                  options={departments.map(department => { return {value:department, display:department} })}
                  name={{id:'department',display:'filter by department'}}
                  constructValue={constructFilterValue}
                />
  
                <SalaryFilter name={{id:'salary',display:'filter by salary'}}/>
              </DropDownContainer>
              
            </OnOnSwitch>
        	  
        	  <InlineContainer gap='1rem' minWidth='75px'>
              <Dropdown
                options={sortDropDownOptions}
                name={{id:'sortCategory',display:'Sort by'}}
                constructValue={constructSortValue}
              />
              <Dropdown
                options={isAscendingDropDownOptions}
                name={{id:'isAscending',display:'Order'}}
                constructValue={constructSortValue}
              />
        	  </InlineContainer>
  
            <div style={{textAlign:'center'}}>
              <button type='submit'>Refine Employees</button>
            </div>
  
        	</FormContainer>
        </Container>
  
        <div style={{textAlign:'center'}}>
          {filteredEmployees.length === employees.length?
          undefined
          :
          <button type='button' onClick={() => reset(liftedStates)}>All Employees</button>}
        </div>
  
        <ResultContainer results={employees} liftUpState={liftUpState}>
          <Employee/>
        </ResultContainer>
        
      </div>
      :
      undefined}
    </main>
  );
}

export default App;
