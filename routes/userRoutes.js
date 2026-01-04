import express from "express";
import { auth } from "../middlewares/authMiddleware";
import { admin } from "../middlewares/adminMiddleware";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);

export default router;
