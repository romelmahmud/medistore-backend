import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getAllUser);
router.patch("/:userId", auth(UserRole.ADMIN), userController.updateUserStatus);

export const userRouter: Router = router;
