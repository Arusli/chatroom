import React from 'react';
import { User, Message } from '../constants/constants';

interface ChatboxProps {
    users: User[]; // Define the props you expect
    messages: Message[];
}

const Names: React.FC<ChatboxProps> = ({ users, messages}) => {

    // assign the correct user color to each message
    const assignMessageColor = (users: User[], message: Message) => {
        const sender = users.find( user => user.id === message.senderId);
        message.color = sender?.color;
    }

    const list = messages.map( (message, index) => {
        assignMessageColor(users, message);
        return <div key={index}><span style={{color: message.color, fontWeight: 'bold'}}>{message.senderName}:</span> {message.text}</div>;
    });
    return <div>{list}</div>;
}

export default Names;