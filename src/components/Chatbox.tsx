import React, { useState } from "react";
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

  let previousMessage: Message;

  const messageList = messages.map((message, index) => {
    assignMessageColor(users, message);
    //
    if (message.status === "entrance") {
      previousMessage = message;
      return (
        <div className="message" style={{ marginTop: "12px" }} key={index}>
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
    } else if (message.status === "exit") {
      previousMessage = message;
      return (
        <div className="message" style={{ marginTop: "12px" }} key={index}>
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
    } else if (index !== 0 && previousMessage.status === 'message' && previousMessage.senderId === message.senderId) {
      // same user is messaging consecutively
      previousMessage = message;
      return (
        <div className="message" style={{ marginTop: "2px" }} key={index}>
          <div className="header">
            <div
              className="text"
            >{` ${message.text} `}</div>
          </div>
        </div>
      );
    } else {
        previousMessage = message;
        return (
          <div className="message" style={{ marginTop: "12px" }} key={index}>
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
  });
  //
  return <div>{messageList}</div>;
};

export default Names;
