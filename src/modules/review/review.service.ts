import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  medicineId: string,
  rating: number,
  comment?: string,
) => {
  // 1️⃣ Check if user purchased & order delivered
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      medicineId,
      order: {
        userId,
        status: OrderStatus.DELIVERED,
      },
    },
  });

  if (!hasPurchased) {
    throw new Error("You can only review medicines you have purchased.");
  }

  // 2️⃣ Create review (unique constraint will protect duplicate)
  const review = await prisma.review.create({
    data: {
      rating,
      comment: comment ?? null,
      userId,
      medicineId,
    },
  });

  return review;
};

const getMedicineReviews = async (
  medicineId: string,
  currentUserId?: string,
) => {
  const reviews = await prisma.review.findMany({
    where: { medicineId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let userMeta = {
    canReview: false,
    alreadyReviewed: false,
  };

  if (currentUserId) {
    // check already reviewed
    const existing = await prisma.review.findUnique({
      where: {
        userId_medicineId: {
          userId: currentUserId,
          medicineId,
        },
      },
    });

    userMeta.alreadyReviewed = !!existing;

    // check purchased
    const purchased = await prisma.orderItem.findFirst({
      where: {
        medicineId,
        order: {
          userId: currentUserId,
          status: OrderStatus.PLACED,
        },
      },
    });

    userMeta.canReview = !!purchased && !existing;
  }

  return {
    reviews,
    userMeta,
  };
};

export const reviewService = {
  createReview,
  getMedicineReviews,
};
