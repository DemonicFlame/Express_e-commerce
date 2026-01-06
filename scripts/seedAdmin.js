import User from "../models/userModel.js";

export async function seedAdmin() {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("Admin user already exists");
    return;
  }

  await User.create({
    name: "admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log("Admin user created");
}
