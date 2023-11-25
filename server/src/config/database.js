import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

// DATABASE SETUP
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected!");
  } catch (err) {
    console.log("DB error: ", err);
  }
};

export default connectDB;
