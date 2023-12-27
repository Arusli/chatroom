import React from "react";
import { User, arrayFromObj } from "../constants/constants";

interface OnlineUsersProps {
  users: User[]; // Define the props you expect
  usersDb: any;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users, usersDb }) => {
  const filteredUsers = arrayFromObj(usersDb)
  // const filteredUsers = users.filter((user) => user.online);
  const list = filteredUsers.map((user, index) => {
    return <li key={index}>{user.name}</li>;
  });

  const usersContainerCss = {
    padding: "5px",
  };
  return (
    <div className="users-container" style={usersContainerCss}>
      <h2>{`${filteredUsers.length} `}Users Online</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default OnlineUsers;
