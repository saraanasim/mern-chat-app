import { Response } from 'express';
import Chat from '../models/chat.model';
import Message from '../models/message.model';
import { CustomRequest } from '../utils/types';

export const sendMessage = async (req:CustomRequest, res:Response) => {
  const { chatId, message } = req.body;
  try {
    let msg = await Message.create({ sender: req.rootUserId, message, chatId });
    msg = await (
      await msg.populate('sender', 'name profilePic email')
    ).populate({
      path: 'chatId',
      select: 'chatName isGroup users',
      model: 'Chat',
      populate: {
        path: 'users',
        select: 'name email profilePic',
        model: 'User',
      },
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: msg,
    });
    res.status(200).send(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
export const getMessages = async (req:CustomRequest, res:Response) => {
  const { chatId } = req.body;
  try {
    let messages = await Message.find({ chatId })
      .populate({
        path: 'sender',
        model: 'User',
        select: 'name profilePic email',
      })
      .populate({
        path: 'chatId',
        model: 'Chat',
      });

    res.status(200).json(messages);
  } catch (error) {
    res.sendStatus(500).json({ error: error });
    console.error(error);
  }
};
