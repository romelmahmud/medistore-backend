import { NextFunction, Request, Response } from "express";
export declare const reviewController: {
    createReview: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getMedicineReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=review.controller.d.ts.map