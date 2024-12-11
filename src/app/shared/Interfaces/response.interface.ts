export interface Response{
  exito: boolean,
  mensaje?: string,
  error?: string,
  user?: User,
  jwt?: string,
  mensajes?: Message[],
  userId?: string,
}

export interface User {
  id: string;
  userName: string;
  email: string;
  rol: string;
  coins: number;
  creationDate: Date;
  favouriteGame: string;
}

export interface Message{
  id: string,
  sender: string;
  recipient: string;
  creationDate: Date;
  title: string;
  read: boolean;
  body: string;
  type: "BUG" | "SUGGESTION" | "GAME_CHALLENGE" | "FRIEND_REQUEST" | "ACHIEVEMENT_UNLOCKED" | "STORE_PROMOTION" | "WARNING" | "SYSTEM_NOTIFICATION";
}

export interface Achievement{
  id: string,
  game: string,
  coins: number,
  level: string,
  name: string,
}
