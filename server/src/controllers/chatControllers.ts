import { Response } from 'express';
import { PopulateOptions } from 'mongoose';
import Chat from '../models/chatModel';
import User from '../models/userModel';
import { CustomRequest } from '../utils/types';

export const accessChats = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId } = req.body;

  if (!userId) {
    res.send({ message: "Provide User's Id" });
    return;
  }

  try {
    let chatExists = await Chat.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: req.rootUserId } } },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .exec();

    let populatedChat = await User.populate(chatExists, {
      path: 'latestMessage.sender',
      select: 'name email profilePic',
    } as PopulateOptions);

    if (populatedChat.length > 0) {
      res.status(200).send(populatedChat[0]);
    } else {
      const data = {
        chatName: 'sender',
        users: [userId, req.rootUserId],
        isGroup: false,
      };

      const newChat = await Chat.create(data);
      const chat = await Chat.findById(newChat._id)
        .populate('users', '-password')
        .exec();

      res.status(200).json(chat);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const fetchAllChats = async (req: CustomRequest, res: Response): Promise<void> => {
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

export const createGroup = async (req: CustomRequest, res: Response): Promise<void> => {
  const { chatName, users } = req.body;

  if (!chatName || !users) {
    res.status(400).json({ message: 'Please fill the fields' });
    return;
  }

  const parsedUsers = JSON.parse(users);
  if (parsedUsers.length < 2) {
    res.status(400).send('Group should contain more than 2 users');
    return;
  }

  parsedUsers.push(req.rootUser);

  try {
    const chat = await Chat.create({
      chatName: chatName,
      users: parsedUsers,
      isGroup: true,
      groupAdmin: req.rootUserId,
    });

    const createdChat = await Chat.findById(chat._id)
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .exec();

    res.status(200).json(createdChat);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const renameGroup = async (req: CustomRequest, res: Response): Promise<void> => {
  const { chatId, chatName } = req.body;

  if (!chatId || !chatName) {
    res.status(400).send('Provide Chat id and Chat name');
    return;
  }

  try {
    const chat = await Chat.findByIdAndUpdate(chatId, {
      $set: { chatName },
    }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .exec();

    if (!chat) {
      res.status(404).send('Chat not found');
      return;
    }

    res.status(200).send(chat);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

export const addToGroup = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;

  try {
    const existing = await Chat.findById(chatId).exec();

    if (existing && !existing.users.includes(userId)) {
      const chat = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
      }, { new: true })
        .populate('groupAdmin', '-password')
        .populate('users', '-password')
        .exec();

      if (!chat) {
        res.status(404).send('Chat not found');
        return;
      }

      res.status(200).send(chat);
    } else {
      res.status(409).send('User already exists');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const removeFromGroup = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;

  try {
    const existing = await Chat.findById(chatId).exec();

    if (existing && existing.users.includes(userId)) {
      const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
      }, { new: true })
        .populate('groupAdmin', '-password')
        .populate('users', '-password')
        .exec();

      res.status(200).send(updatedChat);
    } else {
      res.status(409).send('User does not exist');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const removeContact = async (req: CustomRequest, res: Response): Promise<void> => {
  // Implementation for removeContact
};
