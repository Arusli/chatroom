import React from "react";
import { User } from "../constants/constants";

interface LoginProps {
  currentUser: User; // Define the props you expect
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login: React.FC<LoginProps> = ({ currentUser, setCurrentUser }) => {
  return (
<div>
    <input></input>
    <button>Join</button>
</div>
  )
};

export default Login;
