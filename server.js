import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { seedAdmin } from "./scripts/seedAdmin.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api/admin/users", userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    console.log("Connected to the database successfully.");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};
startServer();
