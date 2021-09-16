import './App.css';
import { Switch, Route } from 'react-router-dom'
import { useState } from 'react';

import Form from './components/routes/Form';
import Login from './components/routes/Login';
import User from './components/routes/User';

function App() {
  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login users={users} setIsLogged={setIsLogged} />
        </Route>

        <Route exact path="/user/:id">
          <User users={users} isLogged={isLogged} setIsLogged={setIsLogged} />
        </Route>

        <Route path="/">
          <Form users={users} setUsers={setUsers} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
