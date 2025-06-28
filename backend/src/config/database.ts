import mongoose from "mongoose";

const MONGODB_CONNECTION_URL =
  process.env.MONGODB_CONNECTION_URL ||
  "mongodb://root:example@localhost:27017/test-app-db?authSource=admin";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};
