import React, { useState } from "react";
import { User, pickColor } from "../constants/constants";
import styles from "./Login.module.css";

interface LoginProps {
  currentUser: User; // Define the props you expect
  enter: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({
  currentUser,
  enter,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 23) {
      setValue(e.target.value);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && value.length > 1) {
      e.preventDefault(); // prevents new line inside text area
      const newUser = {
        ...currentUser,
        name: value,
        color: pickColor(),
        online: true,
      }
      enter(newUser);
      setValue('');
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    if (value.length > 1) {
      const newUser = {
        ...currentUser,
        name: value,
        color: pickColor(),
        online: true,
      }
      enter(newUser);
      setValue('');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h3>Join the Chat?</h3>
      <input
        placeholder="Enter Your Name"
        autoFocus
        value={value}
        onChange={handleChange}
        onKeyDown={keyDownHandler}
      ></input>
      <button disabled={value.length < 1} className={styles.button} onClick={clickHandler} style={{ marginLeft: "10px" }}>
        Join
      </button>
    </div>
  );
};

export default Login;
