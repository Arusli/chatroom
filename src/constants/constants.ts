import { v4 as uuidv4 } from "uuid";

export type User = {
  name: string;
  id: string;
  color: string;
  online: boolean;
};

export type Status = 'entrance' | 'exit' | 'message';

export type Message = {
  text: string;
  senderName: string;
  senderId: string;
  createdAt: string;
  color?: string;
  status?: Status;
};

export const users: User[] = [
  {
    name: `Andrew`,
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d471",
    color: `blue`,
    online: true,
  },
  {
    name: `David`,
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d472",
    color: `purple`,
    online: true,
  },
  {
    name: "Robert",
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d473",
    color: "green",
    online: true,
  },
];

const nowUtc = new Date().toISOString();

export const messages: Message[] = [
  {
    senderName: `Andrew`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d471",
    text: `its me andrew, wanna watch a movie?`,
    createdAt: nowUtc,
    status: 'message',
  },
  {
    senderName: `David`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d472",
    text: `hey andrew. David here. Sure!`,
    createdAt: nowUtc,
    status: 'message'
  },
  {
    senderName: `Robert`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d473",
    text: `I'll join`,
    createdAt: nowUtc,
    status: 'exit',
  },
];

const colors: string[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "black",
];

export const pickColor = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log(randomColor);
  return randomColor;
}

export const generateId = () => {
  return uuidv4();
}

export const utcToLocal = (utcTimestamp: string) => {
  const localTime = new Date(utcTimestamp);
  const hours = localTime.getHours().toString().padStart(2, '0');
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
}