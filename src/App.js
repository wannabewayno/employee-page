import React, { useState ,useEffect } from 'react';
import Nav from './components/elements/Nav'
import FormContainer from './components/elements/FormContainer'
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
      <FormContainer/>
      <ResultContainer data={employees}/>
    </main>
    );
}

export default App;
