import React, { useState, useEffect } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import Login from "./components/Login";
import {
  arrayFromUsersObj,
  arrayFromMessagesObj,
  getSessionUser,
  blankUser,
  sortByCreatedAt,
} from "./constants/constants";
import type { User, Message } from "./constants/constants";
import "./App.css";
import {
  pushMessage,
  usersNodeReference,
  messagesNodeReference,
  infoConnectedNodeReference,
} from "./firebase";
import {
  onValue,
  query,
  limitToLast,
  orderByChild,
  startAt,
  serverTimestamp,
} from "@firebase/database";

function App(): JSX.Element {
  console.log("App renders");
  const [users, setUsers] = useState<User[]>([]);
  // const [usersDb, setUsersDb] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return getSessionUser();
  }); // blankuser
  const [messages, setMessages] = useState<Message[]>([]);
  // console.log("usersStore", users);
  // console.log("app.tsx userSnapshot", userSnapshot);

  useEffect(() => {
    console.log("useEffect with onValue runs");
    const unsubscribe = onValue(
      // unsubscribe fixes double messaging somehow
      usersNodeReference,
      (snapshot) => {
        console.log("onValue runs");
        if (snapshot.exists()) {
          console.log("snapshot exists");
          const usersSnapshot = snapshot.val();
          const usersArray = arrayFromUsersObj(usersSnapshot);
          const activeUsers = usersArray.filter((user) => {
            return user.online;
          })
          setUsers(activeUsers);
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
    };
  }, []);

  // when iphone user navigates away and back, the app starts here and the previous useEffects don't run again.
  // in other words navigating away on iphone does not unmount this component or the app.
  useEffect(() => {
    setCurrentUser(blankUser); // resets user no matter what on app re-render
    const unsubscribe = onValue(infoConnectedNodeReference, (snapshot) => {
      if (snapshot.exists()) {
        const connected = snapshot.val();
        const sessionUser = getSessionUser();
        if (connected) {
          console.log("CONNECTED TO DB");
          //if sessionUser not blank
          //push sessionUser (currentUser?) to DB
          //push entrance message to DB
          //push blank exit message to DB (status: exit)
          //set up onDisconnect logic (delete user from DB, backfill exit message);

          //or we can always blank the session user on connect... simpler.

          //if sessionUser blank
          //do not set sessionUser until login
          //do not push sessionUser to DB until login
          //do not push entrance message to DB until login
          //do not push blank exit message to DB until login

          //if sessionUser blank, on login
          //push sessionUser to DB, receive refId.
          //grab new user entry from database using refId, assign to currentUser (or session user...)
          //push blank exit message (status 'blank') and receive refID.
          //set up onDisconnect logic 
            // (delete user from DB by refId, backfill exit message by refID, and update stat, senderID, createdAt, etc...);
          if (sessionUser.name) {
            console.log(`${sessionUser.name} has connected to DB`);
          }

          if (!sessionUser.name) {
            console.log("new/blank user has connected to DB");
          }

          setCurrentUser(blankUser);
        } else {
          console.log("NOT CONNECTED TO DB");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // what to do with this array dependency?

  useEffect(() => {
    console.log("useEffect runs");
    const limitedQuery = query(
      messagesNodeReference,
      orderByChild("createdAt"),
      startAt(1),
      limitToLast(250),
    ); // queries last 250 messages, sorted
    const unsubscribe = onValue(
      // returns an unsubscribe function to remove listener
      limitedQuery,
      (snapshot) => {
        console.log("onValue runs");
        if (snapshot.exists()) {
          console.log("snapshot exists");
          const messagesSnapshot = snapshot.val();
          const messagesArray = arrayFromMessagesObj(messagesSnapshot);
          const sortedArray = sortByCreatedAt(messagesArray);
          setMessages(sortedArray);
        } else {
          console.log("no data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe(); // calls unsubscribe
    };
  }, []);

  useEffect(() => {
    console.log("Updated users:", users);
    console.log("current user", currentUser);
    console.log("messages", messages);
  }, [users, currentUser, messages]);

  useEffect(() => {
    console.log("CURRENT USER USEEFFECT RUNS");
    if (currentUser.name) {
      console.log("current user name:", currentUser.name);
      pushMessage({
        text: "",
        senderName: currentUser.name,
        senderId: currentUser.id,
        createdAt: serverTimestamp(),
        color: currentUser.color,
        status: "entrance",
      });
      window.sessionStorage.setItem("sessionUser", JSON.stringify(currentUser));
    } else {
      window.sessionStorage.removeItem("sessionUser");
      return;
    }
  }, [currentUser]);

  const sendChat = (newMessage: string) => {
    pushMessage({
      text: newMessage,
      senderName: currentUser.name,
      senderId: currentUser.id,
      createdAt: serverTimestamp(),
      color: currentUser.color,
      status: "message",
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
          <Login
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
          />
        </section>
      </div>
    );
  }
}

export default App;
