export type User = {
  name: string;
  id: number;
  message: string;
};

export const users: User[] = [
  {
    name: "Andrew",
    id: 1,
    message: `its me andrew, whats up?`,
  },
  {
    name: "David",
    id: 2,
    message: 'hey andrew. David here.',
  }
];

export const users2: User[] = [
    {
      name: "Andrew",
      id: 1,
      message: `its me andrew, whats up?`,
    },
    {
      name: "David",
      id: 2,
      message: 'hey andrew. David here.',
    },
    {
        name: "Robert",
        id: 3,
        message: "I'll join"
    }
  ];

export const newUser: User = {
    name: "Robert",
    id: 3,
    message: "I'll join"
}