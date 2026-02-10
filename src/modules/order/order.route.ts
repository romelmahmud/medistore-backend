import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SELLER),
  orderController.getAllOrders,
);

export const orderRouter: Router = router;
