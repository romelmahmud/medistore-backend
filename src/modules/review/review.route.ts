import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get(
  "/:medicineId",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER, { optional: true }),
  reviewController.getMedicineReviews,
);

router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

export const reviewRouter: Router = router;
