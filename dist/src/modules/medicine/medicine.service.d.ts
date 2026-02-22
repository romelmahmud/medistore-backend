import { Medicine } from "../../../generated/prisma/client";
import { MedicineUpdateType } from "./medicine.type";
export declare const medicineService: {
    getAllMedicine: ({ search, category, manufacturer, min, max, page, limit, skip, sortBy, sortOrder, isActive, }: {
        search: string | undefined;
        category: string | undefined;
        manufacturer: string | undefined;
        min: number | undefined;
        max: number | undefined;
        page: number;
        limit: number;
        skip: number;
        sortBy: string;
        sortOrder: "desc" | "asc";
        isActive: boolean | undefined;
    }) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        data: {
            price: number;
            category: {
                id: string;
                createdAt: Date;
                name: string;
                description: string | null;
                imageUrl: string | null;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string | null;
            description: string;
            imageUrl: string | null;
            categoryId: string;
            stock: number;
            manufacturer: string;
            dosage: string;
            manufactureDate: Date | null;
            expireDate: Date | null;
            isActive: boolean;
        }[];
    }>;
    getSingleMedicine: (medicineId: string) => Promise<{
        price: number;
        category: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            imageUrl: string | null;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string | null;
        description: string;
        imageUrl: string | null;
        categoryId: string;
        stock: number;
        manufacturer: string;
        dosage: string;
        manufactureDate: Date | null;
        expireDate: Date | null;
        isActive: boolean;
    }>;
    updateMedicine: (payload: MedicineUpdateType, medicineId: string) => Promise<{
        price: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string | null;
        description: string;
        imageUrl: string | null;
        categoryId: string;
        stock: number;
        manufacturer: string;
        dosage: string;
        manufactureDate: Date | null;
        expireDate: Date | null;
        isActive: boolean;
    }>;
    deleteMedicine: (medicineId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string | null;
        description: string;
        imageUrl: string | null;
        categoryId: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        manufacturer: string;
        dosage: string;
        manufactureDate: Date | null;
        expireDate: Date | null;
        isActive: boolean;
    }>;
    createMedicine: (payload: Medicine) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string | null;
        description: string;
        imageUrl: string | null;
        categoryId: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        manufacturer: string;
        dosage: string;
        manufactureDate: Date | null;
        expireDate: Date | null;
        isActive: boolean;
    }>;
    getMedicineByCategory: (categoryId: string) => Promise<{
        price: number;
        category: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            imageUrl: string | null;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string | null;
        description: string;
        imageUrl: string | null;
        categoryId: string;
        stock: number;
        manufacturer: string;
        dosage: string;
        manufactureDate: Date | null;
        expireDate: Date | null;
        isActive: boolean;
    }[]>;
};
//# sourceMappingURL=medicine.service.d.ts.map