import React, { useState } from "react";
import { User, pickColor, generateId } from "../constants/constants";

interface LoginProps {
  currentUser: User; // Define the props you expect
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Login: React.FC<LoginProps> = ({
  currentUser,
  setCurrentUser,
  setUsers,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 23) {
      setValue(e.target.value);
    }
  };

  const enter = () => {
    const newUser = { ...currentUser, name: value, color: pickColor(), id: generateId() };
    setCurrentUser(newUser);
    setUsers((users) => {
      return [...users, newUser];
    });
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevents new line inside text area
      enter();
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    enter();
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
