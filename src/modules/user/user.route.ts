import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getAllUser);

export const userRouter: Router = router;
