import React from "react";
import { User, Message, utcToLocal } from "../constants/constants";

interface ChatboxProps {
  users: User[]; // Define the props you expect
  messages: Message[];
}

const Names: React.FC<ChatboxProps> = ({ users, messages }) => {
  // assign the correct user color to each message
  const assignMessageColor = (users: User[], message: Message) => {
    const sender = users.find((user) => user.id === message.senderId);
    message.color = sender?.color;
  };

  const messageList = messages.map((message, index) => {
    assignMessageColor(users, message);
    //
    if (message.status === "message") {
      return (
        <div className="message" style={{ marginBottom: "12px" }} key={index}>
          <div className="header">
            <span style={{ color: message.color, fontWeight: "bold" }}>
              {message.senderName}
            </span>
            <span
              style={{ fontSize: "10px", marginLeft: "8px", color: "grey" }}
            >
              {utcToLocal(message.createdAt)}
            </span>
            <div
              className="text"
              style={{ marginTop: "2px" }}
            >{` ${message.text} `}</div>
          </div>
        </div>
      );
    }
    //
    if (message.status === "entrance") {
      return (
        <div className="message" style={{ marginBottom: "12px" }} key={index}>
          <div className="header">
            <span style={{ color: message.color, fontWeight: "bold" }}>
              {`${message.senderName} has joined the chat.`}
            </span>
            <span
              style={{ fontSize: "10px", marginLeft: "8px", color: "grey" }}
            >
              {utcToLocal(message.createdAt)}
            </span>
          </div>
        </div>
      );
    }
    //
    if (message.status === "exit") {
        return (
          <div className="message" style={{ marginBottom: "12px" }} key={index}>
            <div className="header">
              <span style={{ color: message.color, fontWeight: "bold" }}>
                {`${message.senderName} has left the chat.`}
              </span>
              <span
                style={{ fontSize: "10px", marginLeft: "8px", color: "grey" }}
              >
                {utcToLocal(message.createdAt)}
              </span>
            </div>
          </div>
        );
      }
  });
  return <div>{messageList}</div>;
};

export default Names;
