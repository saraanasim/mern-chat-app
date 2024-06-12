import { Request } from 'express';
import { IUser } from '../models/userModel';

export interface CustomRequest extends Request {
  token?: string;
  rootUserId?: string;
  rootUser?: any;
  rootUserEmail?: string;
}

export interface SocketMessage{
  sender:{
    _id: string,
    email: string,
    profilePic: string,
    bio: string,
    name: string,
    isActive: boolean
  }
  message:string
  chat:{
    _id:string
    photo?: string;
    chatName: string;
    isGroup?: boolean;
    users: string[];
  }
}