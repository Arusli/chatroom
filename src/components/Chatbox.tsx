import React, { useState } from "react";
import { User, Message, utcToLocal } from "../constants/constants";

interface ChatboxProps {
  users: User[]; // Define the props you expect
  messages: Message[];
}

interface FormatterProps {
  message: Message;
  alert: string;
}

const AlertFormatter: React.FC<FormatterProps> = ({
  message,
  alert,
}) => {
  return (
    <div className="message" style={{ marginTop: "12px" }}>
      <div className="header">
        <span style={{ color: message.color, fontWeight: "bold" }}>
          {`${message.senderName} ${alert}.`}
        </span>
        <span style={{ fontSize: "10px", marginLeft: "8px", color: "grey" }}>
          {utcToLocal(message.createdAt)}
        </span>
      </div>
    </div>
  );
};

const Chat: React.FC<ChatboxProps> = ({ users, messages }) => {
  console.log("chat re-renders");
  // assign the correct user color to each message
  const assignMessageColor = (users: User[], message: Message) => {
    const sender = users.find((user) => user.id === message.senderId);
    message.color = sender?.color;
  };

  let previousMessage: Message; // tracks consecutive messaging

  // formats and returns entire list of messages for display
  // runs every time there is a new message
  const messageList = messages.map((message, index) => {
    assignMessageColor(users, message);
    //
    if (message.status === "entrance") { // user joins
      previousMessage = message;
      return (
        <AlertFormatter
          message={message}
          key={message.createdAt}
          alert="has joined the chat"
        />
      );
    } else if (message.status === "exit") { // user leaves
      previousMessage = message;
      return (
        <AlertFormatter
          message={message}
          key={message.createdAt}
          alert="has left the chat"
        />
      );
    } else if (
      index !== 0 &&
      previousMessage.status === "message" &&
      previousMessage.senderId === message.senderId
    ) { // same user is messaging consecutively
      previousMessage = message;
      return (
        <div className="message" style={{ marginTop: "2px" }} key={message.createdAt}>
          <div className="header">
            <div className="text">{` ${message.text} `}</div>
          </div>
        </div>
      );
    } else { // standard first message
      previousMessage = message;
      return (
        <div className="message" style={{ marginTop: "12px" }} key={message.createdAt}>
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

export default Chat;
