"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        const { medicineId, rating, comment } = req.body;
        const review = await review_service_1.reviewService.createReview(userId, medicineId, rating, comment);
        res
            .status(201)
            .json({ success: true, message: "Review submitted", data: review });
    }
    catch (error) {
        next(error);
    }
};
const getMedicineReviews = async (req, res, next) => {
    var _a;
    try {
        const medicineId = req.params.medicineId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const result = await review_service_1.reviewService.getMedicineReviews(medicineId, userId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
exports.reviewController = { createReview, getMedicineReviews };
//# sourceMappingURL=review.controller.js.map