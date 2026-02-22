import { Status } from "../../../generated/prisma/enums";
export declare const userService: {
    getAllUser: ({ limit, skip, page, }: {
        limit: number;
        skip: number;
        page: number;
    }) => Promise<{
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        data: {
            role: import("../../../generated/prisma/enums").Role;
            phone: string | null;
            status: Status | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image: string | null;
        }[];
    }>;
    updateUserStatus: (userId: string, status: Status) => Promise<{
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        status: Status | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    }>;
    getMe: (userId: string) => Promise<{
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        status: Status | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map