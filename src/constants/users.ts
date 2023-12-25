export type User = {
  name: string;
  id: number;
  message: string;
  color: string;
};

export const users: User[] = [
  {
    name: `Andrew`,
    id: 1,
    message: `its me andrew, whats up?`,
    color: `blue`,
  },
  {
    name: `David`,
    id: 2,
    message: `hey andrew. David here.`,
    color: `red`,
  },
];

export const users2: User[] = [
  {
    name: `Andrew`,
    id: 1,
    message: `its me andrew, whats up?`,
    color: `blue`,
  },
  {
    name: `David`,
    id: 2,
    message: `hey andrew. David here.`,
    color: `red`,
  },
  {
    name: `Robert`,
    id: 3,
    message: `I'll join`,
    color: `green`,
  },
];

export const newUser: User = {
  name: `Robert`,
  id: 3,
  message: `I'll join`,
  color: `green`,
};
