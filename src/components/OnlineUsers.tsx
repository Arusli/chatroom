import React from "react";
import { User } from "../constants/constants";

interface OnlineUsersProps {
  users: User[]; // Define the props you expect
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
  const list = users.map((user, index) => {
    return <li key={index}>{user.name}</li>;
  });

  const usersContainerCss = {
    padding: "5px",
  };
  return (
    <div className="users-container" style={usersContainerCss}>
      <h2>{`${users.length} `}Users Online</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default OnlineUsers;
