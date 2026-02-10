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
router.get(
  "/:orderId",
  auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),
  orderController.getOrderById,
);
router.get(
  "/customer/:customerId",
  auth(UserRole.CUSTOMER),
  orderController.getCustomerOrders,
);

export const orderRouter: Router = router;
