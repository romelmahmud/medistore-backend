import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { medicineId, rating, comment } = req.body;

    const review = await reviewService.createReview(
      userId,
      medicineId,
      rating,
      comment,
    );

    res
      .status(201)
      .json({ success: true, message: "Review submitted", data: review });
  } catch (error) {
    next(error);
  }
};

const getMedicineReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const medicineId = req.params.medicineId;
    const userId = req.user?.id;

    const result = await reviewService.getMedicineReviews(
      medicineId as string,
      userId,
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const reviewController = { createReview, getMedicineReviews };
