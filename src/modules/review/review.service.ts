import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  medicineId: string,
  rating: number,
  comment?: string,
) => {
  // Only allow users who purchased the medicine
  const purchased = await prisma.orderItem.findFirst({
    where: {
      medicineId,
      order: {
        userId,
        status: {
          in: [
            OrderStatus.PLACED,
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
          ],
        },
      },
    },
  });

  if (!purchased) {
    throw new Error("You can only review medicines you have purchased.");
  }

  const review = await prisma.review.create({
    data: {
      userId,
      medicineId,
      rating,
      comment: comment ?? null,
    },
  });

  return review;
};

const getMedicineReviews = async (
  medicineId: string,
  currentUserId?: string,
) => {
  // Fetch all reviews
  const reviews = await prisma.review.findMany({
    where: { medicineId },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  let userMeta = {
    canReview: false,
    alreadyReviewed: false,
  };

  if (currentUserId) {
    // Check if user already reviewed
    const existing = await prisma.review.findUnique({
      where: { userId_medicineId: { userId: currentUserId, medicineId } },
    });

    userMeta.alreadyReviewed = !!existing;

    // Check if user purchased (status PLACED or above)
    const purchased = await prisma.orderItem.findFirst({
      where: {
        medicineId,
        order: {
          userId: currentUserId,
          status: {
            in: [
              OrderStatus.PLACED,
              OrderStatus.PROCESSING,
              OrderStatus.SHIPPED,
              OrderStatus.DELIVERED,
            ],
          },
        },
      },
    });

    userMeta.canReview = !!purchased && !existing;
  }

  return { reviews, userMeta };
};

export const reviewService = { createReview, getMedicineReviews };
