import mongoose from 'mongoose';

export interface IChat extends Document {
  photo?: string;
  chatName: string;
  isGroup?: boolean;
  users: mongoose.Schema.Types.ObjectId[];
  latestMessage: mongoose.Schema.Types.ObjectId | null;
  groupAdmin: mongoose.Schema.Types.ObjectId | null;
}

const chatSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName: {
      type: String,
      required: true
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const chatModel = mongoose.model('Chat', chatSchema);
export default chatModel;
