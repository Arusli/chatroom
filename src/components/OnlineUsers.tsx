import React from "react";
import { User } from "../constants/users";

interface OnlineUsersProps {
  users: User[]; // Define the props you expect
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
  const list = users.map((user, index) => {
    return <li key={index}>{user.name}</li>;
  });
  return (
    <div className="users-container">
      <h2>Users Online</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default OnlineUsers;
