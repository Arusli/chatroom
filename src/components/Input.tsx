import React, { useState } from "react";
import { User } from "../constants/constants";
import styles from "./Input.module.css";

interface InputProps {
  users: User[]; // Define the props you expect
  sendChat: any;
}

const Input: React.FC<InputProps> = ({ users, sendChat }) => {
  const [value, setValue] = useState(""); // value as a state causes UI to re-render upon change
  // handlers
  const sendHandler = () => {
    if (value.length > 0) {
      sendChat(value);
      setValue("");
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevents new line inside text area
      sendHandler();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 100) {
      setValue(e.target.value);
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    sendHandler();
  };

  return (
    <div className={styles.inputContainer}>
      <div>
        <textarea
          autoFocus
          value={value}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          rows={1}
        ></textarea>
      </div>
      <button disabled={value.length < 1} onClick={clickHandler} className={styles.submitButton} type="submit">
        Send
      </button>
    </div>
  );
};

export default Input;
