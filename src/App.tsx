import React, { useState, useEffect } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import Login from "./components/Login";
import {
  messages as starterMessages, arrayFromObj
} from "./constants/constants";
import type { User, Message, Status } from "./constants/constants";
import "./App.css";
import { writeUser, writeMessage, usersReference } from "./firebase";
import { onValue } from "@firebase/database";

function App(): JSX.Element {
  const blankUser = {
    name: "",
    id: "",
    color: "",
    online: false,
  };

  console.log("App renders");
  const [users, setUsers] = useState<User[]>([]);
  const [usersDb, setUsersDb] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<User>(blankUser); // blankuser
  const [messages, setMessages] = useState<Message[]>([...starterMessages]);
  // console.log("usersStore", users);
  // console.log("app.tsx userSnapshot", userSnapshot);

  useEffect(() => {
    console.log("useEffect runs");
    onValue(usersReference, (snapshot) => {
      console.log('onValue runs');
      if (snapshot.exists()) {
        console.log('snapshot exists')
        const userSnapshot = snapshot.val();
        setUsersDb(userSnapshot);
      } else {
        console.log('no data available');
      }
    }, (error) => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
    console.log('Updated usersDb:', usersDb);
}, [usersDb]);

  const sendChat = (newMessage: string) => {
    // set users
    setMessages((currentMessages: Message[]) => {
      const messageObj = {
        text: newMessage,
        senderName: currentUser.name,
        senderId: currentUser.id,
        createdAt: new Date().toISOString(),
        status: "message" as Status,
      };
      return [...currentMessages, messageObj];
    });
  };

  const writeDb = (
    <div>
      <div>
        <button
          style={{ width: "150px" }}
          onClick={() => writeUser("Andrew", "purple", true)}
        >
          Write User
        </button>
      </div>
      <div>
        <button
          style={{ width: "150px" }}
          onClick={() =>
            writeMessage(
              "hey its me",
              "Andrew",
              "12345",
              "createed12271093498UTC",
              "red",
              "message"
            )
          }
        >
          Write Message
        </button>
      </div>
    </div>
  );

  if (currentUser.name) {
    return (
      <div className="wrapper">
        <section className="section1">
          <div className="users-container">
            <OnlineUsers users={users} usersDb={usersDb} />
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
        {writeDb}
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <section className="section1">
          <div className="users-container">
            <OnlineUsers users={users} usersDb={usersDb} />
          </div>
        </section>
        <section className="section2">
          <Login
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
            setMessages={setMessages}
          />
        </section>
        {writeDb}
      </div>
    );
  }
}

export default App;
