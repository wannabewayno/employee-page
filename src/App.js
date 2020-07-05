import React, { useState ,useEffect } from 'react';
import Nav from './components/elements/Nav';
import FormContainer from './components/lib/containers/FormContainer';
import Dropdown from './components/lib/inputs/Dropdown';
import ResultContainer from './components/elements/ResultContainer';
import InlineContainer  from './components/lib/containers/flex/InlineContainer';
import SearchBar from './components/lib/inputs/SearchBar';
import Container from './components/lib/containers/container';
import { generateData } from './db/data';
import Employee from './components/lib/listElements/employee';
import { useArrange } from './db/sortAndFilterData.js'

function App() {

  // set our initial state with a generated array
  const [ employees ] = useState(generateData(10));

  // define a state to control all liftedUpStates from child containers
  const [ liftedStates, setLiftedStates ] = useState({});

  // call upon a custom hook to sort data
  const arrangeData = useArrange()

  //define from submit
  const formSubmit = formState => {
    console.log(formState);
    const { sort } = formState;
    liftedStates.setResultContainerData(arrangeData([...employees],{isAscending:true,category:sort}));
  }

  // define a liftUpState function for the ResultContainer
  function liftUpState(stateName,stateValue,setStateFunction){
    const addLiftedState = {}
    addLiftedState[stateName] = stateValue
    addLiftedState[`set${stateName.slice(0,1).toUpperCase()}${stateName.slice(1)}`] = setStateFunction
    setLiftedStates({...liftedStates, ...addLiftedState});
  }

  const sortDropDownOptions   = [
    {display:'Name',value:'name'},
    {display:'Job Title',value:'role'},
    {display:'Department',value:'department'},
    {display:'Salary',value:'salary'}
  ]

  const filterDropDownOptions = [ 
    {display:'Name',value:'name'},
    {display:'Job Title',value:'role'},
    {display:'Department',value:'department'}
  ]

  return (
    <main>
      <Nav/>
      <Container>
      	<FormContainer onSubmit={formSubmit}>
      	  <SearchBar name='searchBar'/>
      	  <InlineContainer gap='1rem' minWidth='75px'>
      	  	<Dropdown options={filterDropDownOptions} name='filter'/>
      	  	<Dropdown options={sortDropDownOptions} name='sort'/>
      	  </InlineContainer>
          <button type='submit'>CLICK ME</button>
      	</FormContainer>
      </Container>
      <ResultContainer results={employees} liftUpState={liftUpState}>
        <Employee/>
      </ResultContainer>
    </main>
  );
}

export default App;
