import './App.css';
import { Switch, Route } from 'react-router-dom'
import { useState } from 'react';

import Form from './components/Form';
import Login from './components/Login';
import User from './components/User';

function App() {
  const [users, setUsers] = useState([{id:0, userName: "Paulo", fullName: "Paulo Henrique Magno", password: "123", email:'paulo@gmail.com' }]);

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login users={users} />
        </Route>

        <Route exact path="/user/:id">
          <User users={users} />
        </Route>

        <Route path="/">
          <Form users={users} setUsers={setUsers} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
