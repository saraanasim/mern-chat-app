import mongoose from "mongoose";
import chatModel from "../models/chat.model";
import userModel from "../models/user.model";
import { adminSeedData, seedGroups } from "./seeds";
require('dotenv').config();


const seedChats = async () => {
  try {
    await chatModel.deleteMany({ isGroup: true });
    await chatModel.insertMany(seedGroups);
    
    console.info('Chats seeded successfully!');
  } catch (error) {
    console.error('Error seeding chats:', error);
  } 
}

const seedAdmin = async () => {

  try {
    await userModel.deleteOne({ isAdmin: true });
    await userModel.create(adminSeedData);
    
    console.info('Admin seeded successfully!');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } 
}

export const seedAllData = async () => {
  try {
    await seedChats()
    await seedAdmin()
    console.info('All data seeded successfully!');
  } catch (error) {
    console.error('Error seeding all data:', error);
  } 
}

const mongoDBConnect = async() => {
  try {
    mongoose.connect(process.env.DB_URL as string)
    console.info("MongoDB - Connected");

    await seedAllData()
  } catch (error) {
    console.info("Error - MongoDB Connection " + error);
  }
};
export default mongoDBConnect;
