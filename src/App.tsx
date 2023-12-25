import React, { useState, useEffect } from "react";
import Names from "./components/Chatbox";
import { users, users2 } from "./constants/users";
import "./App.css";

function App(): JSX.Element {
  console.log('App renders')
  const [userStore, setUsers] = useState([...users]);
  console.log('usersStore', userStore);

  useEffect(() => {
    console.log('useEffect runs');
    setUsers([...users2]);
  }, []);

  return (
    <div className="wrapper">
      <div className="chatbox">
        <Names users={userStore} />
      </div>
    </div>
  );
}

export default App;
