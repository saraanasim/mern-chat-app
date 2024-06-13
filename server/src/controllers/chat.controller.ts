import { Response } from 'express';
import { PopulateOptions } from 'mongoose';
import Chat from '../models/chat.model';
import User from '../models/user.model';
import { CustomRequest } from '../utils/types';

export const getAllGroups = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const chats = await Chat.find({ isGroup: true })
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
    console.error(error);
  }
};

export const getExistingChat = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const sender = req.rootUserId
    const { recipient } = req.body
    let chatExists = await Chat.findOne({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender } } },
        { users: { $elemMatch: { $eq: recipient } } },
      ],
    })
      .populate('users')
      .populate('latestMessage')
      .populate('groupAdmin')
      .sort({ updatedAt: -1 })
      .exec();

    res.status(200).json(chatExists || null);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

export const createChat = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const sender = req.rootUserId
    const { recipient } = req.body
    let newChat = await Chat.create({
      chatName: `Private Chat (${sender},${recipient})`,
      users: [sender, recipient]
    })

    let populatedChat = await Chat.findOne({
      _id: newChat._id.toString()
    })
      .populate('users')
      .populate('latestMessage')
      .populate('groupAdmin')
      .sort({ updatedAt: -1 })
      .exec();

    res.status(201).json(populatedChat);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};


