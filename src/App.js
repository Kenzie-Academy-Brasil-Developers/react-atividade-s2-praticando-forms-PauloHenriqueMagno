import './App.css';
import { Switch, Route } from 'react-router-dom'
import { useState } from 'react';

import Form from './components/Form';
import Login from './components/Login';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login users={users} />
        </Route>

        <Route exact path="/user/:id">
        </Route>

        <Route path="/">
          <Form users={users} setUsers={setUsers} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
