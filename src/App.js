import './App.css';
import { useState } from 'react';
import Form from './components/Form';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <Form users={users} setUsers={setUsers} />
    </>
  );
}

export default App;
