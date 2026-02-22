"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../lib/prisma");
const createReview = async (userId, medicineId, rating, comment) => {
    // Only allow users who purchased the medicine
    const purchased = await prisma_1.prisma.orderItem.findFirst({
        where: {
            medicineId,
            order: {
                userId,
                status: {
                    in: [
                        enums_1.OrderStatus.PLACED,
                        enums_1.OrderStatus.PROCESSING,
                        enums_1.OrderStatus.SHIPPED,
                        enums_1.OrderStatus.DELIVERED,
                    ],
                },
            },
        },
    });
    if (!purchased) {
        throw new Error("You can only review medicines you have purchased.");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            userId,
            medicineId,
            rating,
            comment: comment !== null && comment !== void 0 ? comment : null,
        },
    });
    return review;
};
const getMedicineReviews = async (medicineId, currentUserId) => {
    // Fetch all reviews
    const reviews = await prisma_1.prisma.review.findMany({
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
        const existing = await prisma_1.prisma.review.findUnique({
            where: { userId_medicineId: { userId: currentUserId, medicineId } },
        });
        userMeta.alreadyReviewed = !!existing;
        // Check if user purchased (status PLACED or above)
        const purchased = await prisma_1.prisma.orderItem.findFirst({
            where: {
                medicineId,
                order: {
                    userId: currentUserId,
                    status: {
                        in: [
                            enums_1.OrderStatus.PLACED,
                            enums_1.OrderStatus.PROCESSING,
                            enums_1.OrderStatus.SHIPPED,
                            enums_1.OrderStatus.DELIVERED,
                        ],
                    },
                },
            },
        });
        userMeta.canReview = !!purchased && !existing;
    }
    return { reviews, userMeta };
};
exports.reviewService = { createReview, getMedicineReviews };
//# sourceMappingURL=review.service.js.map