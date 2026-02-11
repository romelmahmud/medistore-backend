import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get("/:medicineId", reviewController.getMedicineReviews);

router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

export const reviewRouter: Router = router;
