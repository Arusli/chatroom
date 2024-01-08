import React, { useState, useEffect, useRef } from "react";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";
import OnlineUsers from "./components/OnlineUsers";
import Login from "./components/Login";
import {
  arrayFromUsersObj,
  arrayFromMessagesObj,
  getSessionUser,
  sortByCreatedAt,
} from "./constants/constants";
import type { User, Message } from "./constants/constants";
import "./App.css";
import {
  pushMessage,
  pushUser,
  setUserDisconnect,
  usersNodeReference,
  messagesNodeReference,
  infoConnectedNodeReference,
  getUserByKey,
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<"login" | "chat" | "loading">("loading");
  const currentUser = useRef<User>(getSessionUser());

  useEffect(() => {
    console.log("useEffect with onValue runs");
    const unsubscribe = onValue(
      usersNodeReference,
      (snapshot) => {
        console.log("onValue runs");
        if (snapshot.exists()) {
          console.log("snapshot exists");
          const usersSnapshot = snapshot.val();
          const usersArray = arrayFromUsersObj(usersSnapshot);
          const activeUsers = usersArray.filter((user) => {
            return user.online;
          });
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
    const unsubscribe = onValue(infoConnectedNodeReference, (snapshot) => {
      if (snapshot.exists()) {
        const connected = snapshot.val();
        const sessionUser = getSessionUser();
        const reconnection = sessionUser.name ? true : false;
        if (connected) {
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
          if (reconnection) {
            console.log("sessionUser has re-connected:", sessionUser);
            currentUser.current = sessionUser;
            enter(currentUser.current);
            setView("chat");
          }
          if (!reconnection) {
            console.log("new user has connected to DB");
            setView("login");
          }
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
      limitToLast(250)
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

  const sendChat = (newMessage: string) => {
    pushMessage({
      text: newMessage,
      senderName: currentUser.current.name,
      senderId: currentUser.current.id,
      createdAt: serverTimestamp(),
      color: currentUser.current.color,
      status: "message",
    });
  };

  const enter = async (user: User) => {
    const exitMessageId = await pushMessage({
      status: "exit",
      createdAt: -1,
    });

    const currentUserKey = await pushUser({
      name: user.name,
      color: user.color,
      online: user.online,
      exitMessageId: exitMessageId ? exitMessageId : "",
    });

    if (currentUserKey && exitMessageId) {
      const newUserWithKey = await getUserByKey(currentUserKey);
      newUserWithKey.id = currentUserKey;
      currentUser.current = newUserWithKey;
      window.sessionStorage.setItem(
        "sessionUser",
        JSON.stringify(currentUser.current)
      );
      pushMessage({
        text: "",
        senderName: currentUser.current.name,
        senderId: currentUser.current.id,
        createdAt: serverTimestamp(),
        color: currentUser.current.color,
        status: "entrance",
      });
      setUserDisconnect(newUserWithKey);
      setView("chat");
    }
  };

  if (view === "login") {
    return (
      <div className="wrapper">
        <section className="section1">
          <div className="users-container">
            <OnlineUsers users={users} />
          </div>
        </section>
        <section className="section2">
          <Login currentUser={currentUser.current} enter={enter} />
        </section>
      </div>
    );
  } else if (view === "chat") {
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
    return <></>;
  }
}

export default App;
