import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { optionalAuth } from "../../middleware/optionalAuth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get("/:medicineId", optionalAuth, reviewController.getMedicineReviews);

router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

export const reviewRouter: Router = router;
