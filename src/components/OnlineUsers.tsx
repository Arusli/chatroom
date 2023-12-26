import React from "react";
import { User } from "../constants/constants";

interface OnlineUsersProps {
  users: User[]; // Define the props you expect
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
  const filteredUsers = users.filter((user) => user.online);
  const list = filteredUsers.map((user, index) => {
    return <li key={index}>{user.name}</li>;
  });
  return (
    <div className="users-container">
      <h2>{`${filteredUsers.length} `}Users Online</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default OnlineUsers;
