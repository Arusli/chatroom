import { v4 as uuidv4 } from "uuid";

export type User = {
  name: string;
  id?: string;
  color: string;
  online: boolean;
  exitMessageId: string;
};

export type Status = "entrance" | "exit" | "message";

export type Message = {
  id?: string;
  text?: string;
  senderName?: string;
  senderId?: string;
  createdAt: string;
  color?: string;
  status?: Status;
};

export type MessagePayload = {
  id?: string;
  text?: string;
  senderName?: string;
  senderId?: string;
  createdAt?: string | unknown;
  color?: string;
  status?: Status;
}

export const setUtc = (milliseconds: number) => {
  const now = new Date();
  const newTime = now.getTime() + milliseconds;
  const newDate = new Date(newTime);
  return newDate.toISOString();
};

export const blankUser = {
  name: "",
  id: "",
  color: "",
  online: false,
  exitMessageId: "",
};

export const getSessionUser = (): User => {
  if (window.sessionStorage.getItem("sessionUser") !== null) {
    return JSON.parse(window.sessionStorage.getItem("sessionUser") as string);
  } else {
    return blankUser;
  }
};

// export const mockMessages: Message[] = [
//   {
//     senderName: `Andrew`,
//     senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d471",
//     text: `its me andrew, wanna watch a movie?`,
//     createdAt: setUtc(1),
//     status: 'message',
//   },
//   {
//     senderName: `David`,
//     senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d472",
//     text: `hey andrew. David here. Sure!`,
//     createdAt: setUtc(2),
//     status: 'message'
//   },
//   {
//     senderName: `Robert`,
//     senderId: "f47ac10b-58cc-4372-a567-0e02b2c3d473",
//     text: `I'll join`,
//     createdAt: setUtc(3),
//     status: 'exit',
//   },
// ];

const colors: string[] = ["blue", "green", "purple", "orange", "black"];

export const pickColor = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log(randomColor);
  return randomColor;
};

export const generateId = () => {
  return uuidv4();
};

export const utcToLocal = (utcTimestamp: string) => {
  const localTime = new Date(utcTimestamp);
  const hours = localTime.getHours().toString().padStart(2, "0");
  const minutes = localTime.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
};

export const arrayFromUsersObj = (obj: any) => {
  const array = Object.keys(obj).map((key) => {
    return {
      id: key,
      name: obj[key].name,
      color: obj[key].color,
      online: obj[key].online,
      exitMessageId: obj[key].exitMessageId
    };
  });
  return array;
};

export const arrayFromMessagesObj = (obj: any) => {
  const array = Object.keys(obj).map((key) => {
    return {
      id: key,
      text: obj[key].text,
      senderName: obj[key].senderName,
      senderId: obj[key].senderId,
      createdAt: obj[key].createdAt,
      color: obj[key].color,
      status: obj[key].status,
    };
  });
  return array;
};

export const sortByCreatedAt = (array: Message[]) => {
  const compareFunc = (a: Message, b: Message) => {
    if (a.createdAt < b.createdAt ) {
      return -1
    }

    if (a.createdAt > b.createdAt) {
      return 1
    }

    return 0
  }
  return array.sort(compareFunc)
}