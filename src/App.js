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
import { useArrange } from './sort.js'

function App() {

  const [employees, setEmployees] = useState([]);
  const [containerState, setContainerState] = useState({});
  // const [data, setData] = useState(employees);
  const arrangeData = useArrange()

  useEffect( () => {
    setEmployees(generateData(10));
  }, [])

  useEffect (() => console.log(employees),[employees])

  const formSubmit = formState => {
    console.log(formState);
    const { sort } = formState;
    setEmployees(arrangeData(employees,true,sort));
    console.log(employees);
    console.log(containerState);
    containerState.setStateFn(employees)
    console.log(containerState.stateValue)
  }

  function liftUpState(state,setState){
    setContainerState({stateValue:state,setStateFn:setState});
  }

  const sortDropDownOptions   = [
    {display:'Name',value:'name'},
    {display:'Job Title',value:'role'},
    {display:'Department',value:'department'}
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
