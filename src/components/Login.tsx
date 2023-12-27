import React, { useState } from "react";
import {
  User,
  Message,
  Status,
  pickColor,
  generateId,
} from "../constants/constants";
import { writeUser } from "../firebase";

interface LoginProps {
  currentUser: User; // Define the props you expect
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Login: React.FC<LoginProps> = ({
  currentUser,
  setCurrentUser,
  setUsers,
  setMessages,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 23) {
      setValue(e.target.value);
    }
  };

  const enter = () => {
    const newUser = {
      ...currentUser,
      name: value,
      color: pickColor(),
      id: generateId(),
      online: true,
    };
    setCurrentUser(newUser);
    writeUser({
      name: newUser.name,
      color: newUser.color,
      online: newUser.online,
    })
    setMessages((messages) => {
      const entranceMessage = {
        senderName: newUser.name,
        senderId: newUser.id,
        createdAt: new Date().toISOString(),
        text: "",
        status: "entrance" as Status,
      };
      return [...messages, entranceMessage];
    });
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && value.length > 1) {
      e.preventDefault(); // prevents new line inside text area
      enter();
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    if (value.length > 1) {
      enter();
    }
  };

  return (
    <div className="login-container">
      <h3>Join the Chat?</h3>
      <input
        placeholder="Enter Your Name"
        autoFocus
        value={value}
        onChange={handleChange}
        onKeyDown={keyDownHandler}
      ></input>
      <button onClick={clickHandler} style={{ marginLeft: "10px" }}>
        Join
      </button>
    </div>
  );
};

export default Login;
