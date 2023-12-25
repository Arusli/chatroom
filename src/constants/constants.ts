export type User = {
  name: string;
  id: number;
  color: string;
};

export type Message = {
  text: string;
  senderName: string;
  senderId: number;
  timeSent: string;
  color?: string;
}

export const users: User[] = [
  {
    name: `Andrew`,
    id: 1,
    color: `blue`,
  },
  {
    name: `David`,
    id: 2,
    color: `red`,
  },
  {
    name: 'Robert',
    id: 3,
    color: 'green'
  }
];

const nowUtc = new Date().toISOString();

export const messages: Message[] = [
  {
    senderName: `Andrew`,
    senderId: 1,
    text: `its me andrew, wanna watch a movie?`,
    timeSent: nowUtc,
  },
  {
    senderName: `David`,
    senderId: 2,
    text: `hey andrew. David here. Sure!`,
    timeSent: nowUtc,
  },
  {
    senderName: `Robert`,
    senderId: 3,
    text: `I'll join`,
    timeSent: nowUtc,
  },
];
