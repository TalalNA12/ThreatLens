import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("Using existing Database connection");
    return cached.conn;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
    
    cached.conn = db;
    return db;
    
  } catch (err) {
    console.log("Database connection error:", err);
    process.exit(1);
  }
}

export default connectDB;