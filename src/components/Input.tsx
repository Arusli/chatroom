import React, { useState } from "react";
import { User } from "../constants/users";

interface InputProps {
  users: User[]; // Define the props you expect
  sendChat: any;
}

const Input: React.FC<InputProps> = ({ users, sendChat }) => {
  const [value, setValue] = useState(""); // value as a state causes UI to re-render upon change
  // handlers
  const sendHandler = () => {
    sendChat(value);
    setValue("");
  }

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevents new line inside text area
      sendHandler();
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const clickHandler = (e: React.MouseEvent) => {
    sendHandler();
  }

  return (
    <div className="input-container">
      <div>
        <textarea
          value={value}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          rows={1}
          cols={50}
        ></textarea>
      </div>
      <button onClick={clickHandler} className="submit-button" type="submit">
        Send
      </button>
      <h2>{value}</h2>
    </div>
  );
};

export default Input;
