import React, { useState } from "react";
import { User } from "../constants/constants";

interface LoginProps {
  currentUser: User; // Define the props you expect
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login: React.FC<LoginProps> = ({ currentUser, setCurrentUser }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 23) {
      setValue(e.target.value);
    }
  };

  const enter = () => {
    setCurrentUser( (user) => {
        return {...user, name: value}
    })
  }

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevents new line inside text area
      enter();
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    enter();
  }

  return (
    <div className="login-container">
      <input placeholder="Name" autoFocus value={value} onChange={handleChange} onKeyDown={keyDownHandler}></input>
      <button onClick={clickHandler} style={{ marginLeft: "10px" }}>Join</button>
    </div>
  );
};

export default Login;
