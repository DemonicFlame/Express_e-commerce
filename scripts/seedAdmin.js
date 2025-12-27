import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function seedAdmin() {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("Admin user already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

  await User.create({
    name: "admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created");
}
