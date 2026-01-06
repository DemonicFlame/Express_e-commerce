import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);

export default router;
