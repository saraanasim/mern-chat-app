import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as Server from 'socket.io';
import chatRoutes from './routes/chat.route';
import messageRoutes from './routes/message.route';
import userRoutes from './routes/user.route';
import mongoDBConnect from './utils/connection';
import { CLIENT_URL, PORT } from './utils/constants';
import { SocketMessage } from './utils/types';

const app = express();

const corsConfig = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
mongoose.set('strictQuery', false);
mongoDBConnect();

//Express server
const server = app.listen(PORT, () => {
  console.info(`Server Listening at PORT - ${PORT}`);
});

//Socket Server
const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: CLIENT_URL,
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });
  socket.on('join room', ({ room, user }) => {
    socket.join(room);
    socket.in(room).emit('someone joined', user)
  });
  socket.on('leave room', ({ room, user }) => {
    socket.join(room);
    socket.in(room).emit('someone left', user)
  });
  socket.on('typing', ({ room, user }) => {
    socket.in(room).emit('typing', user)
  })
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve: SocketMessage) => {
    var chat = newMessageRecieve.chat;
    socket.in(chat._id).emit('message recieved', newMessageRecieve);
  });
});
