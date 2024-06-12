import mongoose from "mongoose";
import chatModel from "../models/chatModel";
import userModel from "../models/userModel";
import { adminSeedData, seedGroups } from "./seeds";
require('dotenv').config();


const seedChats = async () => {
  try {
    await chatModel.deleteMany({ isGroup: true });
    await chatModel.insertMany(seedGroups);
    
    console.log('Chats seeded successfully!');
  } catch (error) {
    console.error('Error seeding chats:', error);
  } 
}

const seedAdmin = async () => {

  try {
    await userModel.deleteOne({ isAdmin: true });
    await userModel.create(adminSeedData);
    
    console.log('Admin seeded successfully!');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } 
}

export const seedAllData = async () => {
  try {
    await seedChats()
    await seedAdmin()
    console.log('All data seeded successfully!');
  } catch (error) {
    console.error('Error seeding all data:', error);
  } 
}

const mongoDBConnect = async() => {
  try {
    mongoose.connect(process.env.DB_URL as string)
    console.log("MongoDB - Connected");

    await seedAllData()
  } catch (error) {
    console.log("Error - MongoDB Connection " + error);
  }
};
export default mongoDBConnect;
