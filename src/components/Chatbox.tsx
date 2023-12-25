import React from 'react';
import { User } from '../constants/users';

interface NamesProps {
    users: User[]; // Define the props you expect
}

const Names: React.FC<NamesProps> = ({ users }) => {

    const list = users.map( (user, index) => {
        return <div key={index}>{user.name}: {user.message}</div>;
    });
    return <div>{list}</div>;
}

export default Names;