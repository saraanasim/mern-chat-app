import { Request } from 'express';

export interface CustomRequest extends Request {
  token?: string;
  rootUserId?: string;
  rootUser?: any;
  rootUserEmail?: string;
}