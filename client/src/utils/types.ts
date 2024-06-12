import { ActiveUserSlice } from "@/redux/activeUserSlice";
import { ChatsSliceType } from "@/redux/chatsSlice";

export type HeadersType = {
  Authorization: string;
  'Content-Type': string;
};

export type SignupPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type IUser = {
  _id: string
  name: string;
  email: string;
  password: string;
  profilePic: string;
  isActive:boolean
  bio: string
}

export type IChat = {
  _id: string
  photo?: string;
  chatName: string;
  isGroup?: boolean;
  users: string[];
  groupAdmin: string | null;
}

export type IGroup = Omit<IChat, 'isGroup'> & {
  isGroup: true
}

export type SocketMessage={ sender: ActiveUserSlice, message: string,chat:IChat }