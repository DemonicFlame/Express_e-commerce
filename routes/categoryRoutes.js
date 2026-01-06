import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/admin/categories", auth, admin, createCategory);
router.put("/admin/categories/:id", auth, admin, updateCategory);
router.delete("/admin/categories/:id", auth, admin, deleteCategory);

export default router;
