import React, { useState } from 'react';
import Nav from './components/elements/Nav';
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
import DropDownContainer from './components/lib/containers/DropDownContainer'
import { OnOnSwitchOptions, sortDropDownOptions, isAscendingDropDownOptions, filterDropDownOptions } from './lib/formOptions'
import SalaryFilter from './components/elements/SalaryFilter'

function App() {

  // set our initial state with a generated array
  const [ employees ] = useState(generateData(20));

  // define a state to control all liftedUpStates from child containers
  const [ liftedStates, setLiftedStates ] = useState({});

  // call upon a custom hook to sort data
  const arrangeData = useArrange()

  //define from submit
  function formSubmit(formState){
    console.log(formState);
    const { sortConditions, filterConditions } = constructConditions(formState);
    liftedStates.setResultContainerData(arrangeData([...employees], sortConditions, filterConditions ));
  }

  function switchTarget(target) {

  }

  // define a liftUpState function for the ResultContainer
  function liftUpState(stateName,stateValue,setStateFunction){
    const setStateFunctionName = `set${stateName.slice(0,1).toUpperCase()}${stateName.slice(1)}`
    setLiftedStates({
      ...liftedStates,
      [stateName]:stateValue,
      [setStateFunctionName]:setStateFunction
    });
  }


  return (
    <main>
      <Nav/>
      <Container>
      	<FormContainer onSubmit={formSubmit}>
          <OnOnSwitch
          options = {OnOnSwitchOptions}
          getSwitchTarget = {switchTarget}>
            <SearchBar name={{id:'query', display:'Filter by keyword', toDisplay:false}}/>
            <DropDownContainer name={{id:'dropDown container',display:'Filter by category'}} options={filterDropDownOptions}>
              <Dropdown options={[{value:'Special facilities advisor',display:'Special facilities advisor'}]} name={{id:'role',display:'filter by job title'}}/>
              <Dropdown options={[{value:'garden',display:'GARDEN'}]} name={{id:'department',display:'filter by department'}}/>
              <SalaryFilter name={{id:'salary',display:'filter by salary'}}/>
            </DropDownContainer>
          </OnOnSwitch>
      	  
      	  <InlineContainer gap='1rem' minWidth='75px'>
            <Dropdown options={sortDropDownOptions} name={{id:'category',display:'Sort by'}}/>
            <Dropdown options={isAscendingDropDownOptions} name={{id:'isAscending',display:'Order'}}/>
      	  </InlineContainer>
          <button type='submit'>Refine Employees</button>
      	</FormContainer>
      </Container>
      <ResultContainer results={employees} liftUpState={liftUpState}>
        <Employee/>
      </ResultContainer>
    </main>
  );
}

export default App;
