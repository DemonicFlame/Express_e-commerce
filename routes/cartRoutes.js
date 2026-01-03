import express from "express";
import {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cartController";
import { auth } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add", auth, addItem);
router.get("/", auth, getCart);
router.put("/update/:itemid", auth, updateItem);
router.delete("/remove/:itemid", auth, removeItem);
router.delete("/clear", auth, clearCart);

export default router;
