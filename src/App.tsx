import React, { useState, useEffect } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import { users, users2 } from "./constants/users";
import type { User } from "./constants/users";
import "./App.css";

function App(): JSX.Element {
  console.log("App renders");
  const [userStore, setUsers] = useState([...users]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  console.log("usersStore", userStore);

  useEffect(() => {
    console.log("useEffect runs");
    setUsers([...users2]);
  }, []);

  const sendChat = (newMessage: string) => {
    // set current user
    setCurrentUser((currentUser: User) => {
      return { ...currentUser, message: newMessage };
    });
    // set users
    setUsers((users: User[]) => {
      const foundUser = users.find(e => e.id === currentUser.id);
      if (foundUser) {
        foundUser.message = newMessage;
      }
      return users;
    });

  };

  return (
    <div className="wrapper">
      <section className="section1">
        <div className="users-container">
          <OnlineUsers users={userStore} />
        </div>
      </section>
      <section className="section2">
        <div className="chatbox-container">
          <Chatbox users={userStore} />
        </div>
        <div className="input-container">
          <Input users={userStore} sendChat={sendChat} />
        </div>
      </section>
    </div>
  );
}

export default App;
