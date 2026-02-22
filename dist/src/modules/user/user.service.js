"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllUser = async ({ limit, skip, page, }) => {
    const result = await prisma_1.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const count = await prisma_1.prisma.user.count();
    return {
        meta: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        },
        data: result,
    };
};
const getMe = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
const updateUserStatus = async (userId, status) => {
    const updateUser = await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status,
        },
    });
    return updateUser;
};
exports.userService = {
    getAllUser,
    updateUserStatus,
    getMe,
};
//# sourceMappingURL=user.service.js.map