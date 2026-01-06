import express from "express";
import {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cartController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", auth, addItem);
router.get("/", auth, getCart);
router.put("/update/:productId", auth, updateItem);
router.delete("/remove/:productId", auth, removeItem);
router.delete("/clear", auth, clearCart);

export default router;
