import { Category } from "../../../generated/prisma/client";
import { CategoryUpdateType } from "./category.type";
export declare const categoryService: {
    createCategory: (payload: Category) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    getAllCategory: () => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        imageUrl: string | null;
    }[]>;
    updateCategory: (payload: CategoryUpdateType, categoryId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    deleteCategory: (categoryId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    getCategoryById: (categoryId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        imageUrl: string | null;
    } | null>;
};
//# sourceMappingURL=category.service.d.ts.map