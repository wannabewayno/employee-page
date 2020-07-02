import React, { useState ,useEffect } from 'react';
import Nav from './components/elements/Nav';
import FormContainer from './components/elements/FormContainer';
import Dropdown from './components/lib/input/Dropdown';
import ResultContainer from './components/elements/ResultContainer';
import InlineContainer  from './components/lib/container/flex/InlineContainer';
import SearchBar from './components/lib/input/SearchBar';
import Container from './components/lib/container/container';
import { generateData } from './db/data';

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect( () => {
    setEmployees(generateData(10));
  }, [])

  return (
    <main>
      <Nav/>
      <Container>
      	<FormContainer>
      	  <SearchBar/>
      	  <InlineContainer gap='1rem' minWidth='75px'>
      	  	<Dropdown options={['option1','option2','option3','option4']} name='filter'/>
      	  	<Dropdown options={['option1','option2','option3','option4']} name='sort'/>
      	  </InlineContainer>
          <button type='submit'>CLICK ME</button>
      	</FormContainer>
      </Container>
      <ResultContainer data={employees}/>
    </main>
    );
}

export default App;
