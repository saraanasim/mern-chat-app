import bcrypt from 'bcryptjs';
import { Response } from 'express';
import user from '../models/userModel';
import { CustomRequest } from '../utils/types';
require('dotenv').config();

// Register user
export const register = async (req: CustomRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already Exists' });

    const fullName = `${firstName} ${lastName}`;
    const newUser = new user({ email, password, name: fullName });
    const token = await newUser.generateAuthToken();
    await newUser.save();

    res.json({ message: 'success', token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).send(error);
  }
};

// Login user
export const login = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;
  try {
    const valid = await user.findOne({ email });
    if (!valid) return res.status(200).json({ message: 'User does not exist' });

    const validPassword = await bcrypt.compare(password, valid.password);
    if (!validPassword) {
      return res.status(200).json({ message: 'Invalid Credentials' });
    }

    const token = await valid.generateAuthToken();
    await valid.save();
    res.cookie('auth', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, status: 200 });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Validate user
export const validUser = async (req: CustomRequest, res: Response) => {
  try {
    const validUser = await user.findOne({ _id: req.rootUserId }).select('-password');
    if (!validUser) return res.json({ message: 'User is not valid' });

    res.status(201).json({
      user: validUser,
      token: req.token,
    });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

// Logout user
export const logout = (req: CustomRequest, res: Response) => {
  if (req.rootUser) {
    req.rootUser.tokens = req.rootUser.tokens.filter((e: any) => e.token !== req.token);
  }
  res.status(200).send('Logged out');
};

// Get user by ID
export const getUserById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    const selectedUser = await user.findOne({ _id: id }).select('-password');
    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};


// Update user info
export const getAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    const allUsers = await user.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error });
  }
};