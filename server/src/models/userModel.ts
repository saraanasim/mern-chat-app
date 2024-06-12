import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean
  bio?: string;
  profilePic?: string;
  contacts?: mongoose.Schema.Types.ObjectId[];
  generateAuthToken: () => Promise<string>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    bio: { type: String, default: 'Available' },
    profilePic: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.SECRET as string,
      { expiresIn: '24h' }
    );
    return token;
  } catch (error) {
    console.error('Error while generating token:', error);
    throw error;
  }
};

const userModel = mongoose.model<IUser>('User', userSchema);
export default userModel;
