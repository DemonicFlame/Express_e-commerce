import mongoose from "mongoose";

const clientOptions = {
  dbName: "ecommerceApp",
};

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, clientOptions);
  isConnected = true;
}
