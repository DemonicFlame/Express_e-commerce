import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);

export default router;
