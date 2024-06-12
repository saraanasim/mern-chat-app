import { Response } from 'express';
import { PopulateOptions } from 'mongoose';
import Chat from '../models/chatModel';
import User from '../models/userModel';
import { CustomRequest } from '../utils/types';

export const getAllGroups = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.rootUserId } },
    })
      .populate('users')
      .populate('latestMessage')
      .populate('groupAdmin')
      .sort({ updatedAt: -1 })
      .exec();

    const finalChats = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name email profilePic',
    } as PopulateOptions);

    res.status(200).json(finalChats);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
