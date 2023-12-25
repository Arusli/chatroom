import React, { useState, useEffect } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import Login from "./components/Login";
import { users as starterUsers, messages as starterMessages } from "./constants/constants";
import type { User, Message } from "./constants/constants";
import "./App.css";

function App(): JSX.Element {
  const blankUser = {
    name: "",
    id: "",
    color: "",
  };

  console.log("App renders");
  const [users, setUsers] = useState([...starterUsers]);
  const [currentUser, setCurrentUser] = useState(blankUser); // blankuser
  const [messages, setMessages] = useState([...starterMessages]);
  console.log("usersStore", users);

  useEffect(() => {
    console.log("useEffect runs");
  }, []);

  const sendChat = (newMessage: string) => {
    // set users
    setMessages((currentMessages: Message[]) => {
      const messageObj = {
        text: newMessage,
        senderName: currentUser.name,
        senderId: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      return [...currentMessages, messageObj];
    });
  };

  if (currentUser.name) {
    return (
      <div className="wrapper">
        <section className="section1">
          <div className="users-container">
            <OnlineUsers users={users} />
          </div>
        </section>
        <section className="section2">
          <div className="chatbox-container">
            <Chatbox users={users} messages={messages} />
          </div>
          <div className="input-container">
            <Input users={users} sendChat={sendChat} />
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <section className="section1">
          <div className="users-container">
            <OnlineUsers users={users} />
          </div>
        </section>
        <section className="section2">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setUsers={setUsers} />
        </section>
      </div>
    );
  }
}

export default App;
