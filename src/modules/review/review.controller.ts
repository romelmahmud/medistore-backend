import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const userId = req.user?.id; // from auth middleware

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { medicineId, rating, comment } = req.body;

  const review = await reviewService.createReview(
    userId,
    medicineId,
    rating,
    comment,
  );

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
};

const getMedicineReviews = async (req: Request, res: Response) => {
  const { medicineId } = req.params;
  const userId = req.user?.id; // optional (if logged in)

  const result = await reviewService.getMedicineReviews(
    medicineId as string,
    userId,
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const reviewController = {
  createReview,
  getMedicineReviews,
};
