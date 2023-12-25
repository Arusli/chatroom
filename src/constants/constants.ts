import { v4 as uuidv4 } from "uuid";

export type User = {
  name: string;
  id: string;
  color: string;
};

export type Message = {
  text: string;
  senderName: string;
  senderId: string;
  timeSent: string;
  color?: string;
};

export const users: User[] = [
  {
    name: `Andrew`,
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d471",
    color: `blue`,
  },
  {
    name: `David`,
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d472",
    color: `red`,
  },
  {
    name: "Robert",
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d473",
    color: "green",
  },
];

const nowUtc = new Date().toISOString();

export const messages: Message[] = [
  {
    senderName: `Andrew`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d471",
    text: `its me andrew, wanna watch a movie?`,
    timeSent: nowUtc,
  },
  {
    senderName: `David`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d472",
    text: `hey andrew. David here. Sure!`,
    timeSent: nowUtc,
  },
  {
    senderName: `Robert`,
    senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d473",
    text: `I'll join`,
    timeSent: nowUtc,
  },
];

const colors: string[] = [
  "blue",
  "red",
  "green",
  "purple",
  "cyan",
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
