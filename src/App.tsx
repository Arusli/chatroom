import React, { useState, useEffect } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import Login from "./components/Login";
import {
  arrayFromUsersObj,
  arrayFromMessagesObj,
  setUtc,
} from "./constants/constants";
import type { User, Message } from "./constants/constants";
import "./App.css";
import {
  pushUser,
  pushMessage,
  usersNodeReference,
  messagesNodeReference,
  setUserDisconnect,
  removeUser
} from "./firebase";
import { onValue, query, limitToLast } from "@firebase/database";

function App(): JSX.Element {
  const blankUser = {
    name: "",
    id: "",
    color: "",
    online: false,
  };

  console.log("App renders");
  const [users, setUsers] = useState<User[]>([]);
  // const [usersDb, setUsersDb] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<User>(blankUser); // blankuser
  const [messages, setMessages] = useState<Message[]>([]);
  // console.log("usersStore", users);
  // console.log("app.tsx userSnapshot", userSnapshot);

  useEffect(() => {
    console.log("useEffect runs");
    const unsubscribe = onValue( // fixes double messaging somehow
      usersNodeReference,
      (snapshot) => {
        console.log("onValue runs");
        if (snapshot.exists()) {
          console.log("snapshot exists");
          const usersSnapshot = snapshot.val();
          let usersArray = arrayFromUsersObj(usersSnapshot);
          const offlineUser = usersArray.find((user) => {
            return !user.online;
          });
          if (offlineUser) { // what if there are multiple offline users? this only runs when someone is online
            const index = usersArray.indexOf(offlineUser);
            usersArray.splice(index, 1);
            removeUser(offlineUser);
            pushMessage({
              text: '',
              senderName: offlineUser.name,
              senderId: offlineUser.id,
              createdAt: setUtc(0),
              color: offlineUser.color,
              status: 'exit',
            })
          }
          setUsers(usersArray);
        } else {
          console.log("no data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    console.log("useEffect runs");
    const limitedQuery = query(messagesNodeReference, limitToLast(250
      )); // queries last 250 messages
    const unsubscribe = onValue(
      limitedQuery,
      (snapshot) => {
        console.log("onValue runs");
        if (snapshot.exists()) {
          console.log("snapshot exists");
          const messagesSnapshot = snapshot.val();
          setMessages(arrayFromMessagesObj(messagesSnapshot));
        } else {
          console.log("no data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    console.log("Updated users:", users);
    console.log("current user", currentUser);
    console.log("messages", messages);
  }, [users, currentUser, messages]);

  useEffect(() => {
    if (currentUser.name) {
      pushMessage({
        text: "",
        senderName: currentUser.name,
        senderId: currentUser.id,
        createdAt: setUtc(0),
        color: currentUser.color,
        status: "entrance",
      });
      setUserDisconnect(currentUser);
    } else {
      return;
    }
  }, [currentUser]);

  const sendChat = (newMessage: string) => {
    pushMessage({
      text: newMessage,
      senderName: currentUser.name,
      senderId: currentUser.id,
      createdAt: setUtc(0),
      color: currentUser.color,
      status: "message",
    });
  };

  const writeDb = (
    <div>
      <div>
        <button
          style={{ width: "150px", margin: "10px" }}
          onClick={() =>
            pushUser({ name: "Andrew", color: "purple", online: true })
          }
        >
          Write User
        </button>
      </div>
      <div>
        <button
          style={{ width: "150px" }}
          onClick={() =>
            pushMessage({
              text: "hey its me",
              senderName: currentUser.name,
              senderId: currentUser.id,
              createdAt: "createed12271093498UTC",
              color: currentUser.color,
              status: "message",
            })
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
        {/* {writeDb} */}
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
          <Login
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
          />
        </section>
        {/* {writeDb} */}
      </div>
    );
  }
}

export default App;
