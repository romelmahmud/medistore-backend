export declare const reviewService: {
    createReview: (userId: string, medicineId: string, rating: number, comment?: string) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        medicineId: string;
        rating: number;
        comment: string | null;
    }>;
    getMedicineReviews: (medicineId: string, currentUserId?: string) => Promise<{
        reviews: ({
            user: {
                id: string;
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            medicineId: string;
            rating: number;
            comment: string | null;
        })[];
        userMeta: {
            canReview: boolean;
            alreadyReviewed: boolean;
        };
    }>;
};
//# sourceMappingURL=review.service.d.ts.map