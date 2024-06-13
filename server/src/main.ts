import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as Server from 'socket.io';
import chatRoutes from '../src/routes/chat';
import messageRoutes from '../src/routes/message';
import userRoutes from '../src/routes/user';
import mongoDBConnect from './utils/connection';
import { SocketMessage } from './utils/types';
require('dotenv').config();


const app = express();
const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};
const PORT=process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
mongoose.set('strictQuery', false);
mongoDBConnect();
const server = app.listen(PORT, () => {
  console.log(`Server Listening at PORT - ${PORT}`);
});
const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });
  socket.on('join room', (room) => {
    socket.join(room);
  });
  socket.on('typing', ({ room,user}) => {
    console.log({room,user})
    socket.in(room).emit('typing',user)
  })
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve:SocketMessage) => {
    var chat = newMessageRecieve.chat;
    socket.in(chat._id).emit('message recieved', newMessageRecieve);
    if (!chat.users) console.log('chats.users is not defined');
  });
});
