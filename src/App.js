import React, { useState ,useEffect } from 'react';
import Nav from './components/elements/Nav'
import FormContainer from './components/elements/FormContainer'
import Dropdown from './components/lib/input/Dropdown'
import ResultContainer from './components/elements/ResultContainer'
import { generateData } from './db/data'

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect( () => {
    setEmployees(generateData(10));
  }, [])

  return (
    <main>
      <Nav/>
      <FormContainer>
        
        <Dropdown options={['option1','option2','option3','option4']}/>
        <Dropdown options={['option1','option2','option3','option4']}/>
      </FormContainer>
      <ResultContainer data={employees}/>
    </main>
    );
}

export default App;
