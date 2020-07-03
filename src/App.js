import React, { useState ,useEffect } from 'react';
import Nav from './components/elements/Nav';
import FormContainer from './components/elements/FormContainer';
import Dropdown from './components/lib/input/Dropdown';
import ResultContainer from './components/elements/ResultContainer';
import InlineContainer  from './components/lib/container/flex/InlineContainer';
import SearchBar from './components/lib/input/SearchBar';
import Container from './components/lib/container/container';
import { generateData } from './db/data';
import Employee from './components/lib/listElements/employee';

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect( () => {
    setEmployees(generateData(10));
  }, [])

  const formSubmit = formState => console.log(formState)

  return (
    <main>
      <Nav/>
      <Container>
      	<FormContainer onSubmit={formSubmit}>
      	  <SearchBar name='searchBar'/>
      	  <InlineContainer gap='1rem' minWidth='75px'>
      	  	<Dropdown options={['option1','option2','option3','option4']} name='filter'/>
      	  	<Dropdown options={['option1','option2','option3','option4']} name='sort'/>
      	  </InlineContainer>
          <button type='submit'>CLICK ME</button>
      	</FormContainer>
      </Container>
      <ResultContainer data={employees}>
        <Employee/>
      </ResultContainer>
    </main>
  );
}

export default App;
