import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = express.Router();

router.get("/", categoryController.getAllCategory);
router.post("/", auth(UserRole.ADMIN), categoryController.createCategory);
router.patch(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryController.updateCategory,
);
router.delete(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRouter: Router = router;
