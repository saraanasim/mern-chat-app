import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import user from '../models/userModel';
import { CustomRequest } from '../utils/types';
require('dotenv').config();

// Middleware to handle authentication
export const Auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    if (token.length < 500) {
      const verifiedUser = jwt.verify(token, process.env.SECRET!) as JwtPayload;
      const rootUser = await user.findOne({ _id: verifiedUser.id }).select('password');
      if (!rootUser) {
        return res.status(401).json({ error: 'User not found' });
      }
      req.token = token;
      req.rootUser = rootUser;
      req.rootUserId = rootUser._id?.toString();
    } else {
      const data = jwt.decode(token) as JwtPayload;
      if (!data || !data.email) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.rootUserEmail = data.email;
      const googleUser = await user.findOne({ email: req.rootUserEmail }).select('password');
      if (!googleUser) {
        return res.status(401).json({ error: 'User not found' });
      }
      req.rootUser = googleUser;
      req.token = token;
      req.rootUserId = googleUser._id?.toString();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Invalid Token' });
  }
};


