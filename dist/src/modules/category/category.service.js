"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (payload) => {
    const result = await prisma_1.prisma.category.create({
        data: payload,
    });
    return result;
};
const getAllCategory = async () => {
    const result = await prisma_1.prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getCategoryById = async (categoryId) => {
    const result = await prisma_1.prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    return result;
};
const updateCategory = async (payload, categoryId) => {
    const result = await prisma_1.prisma.category.update({
        where: {
            id: categoryId,
        },
        data: payload,
    });
    return result;
};
const deleteCategory = async (categoryId) => {
    const result = await prisma_1.prisma.category.delete({
        where: {
            id: categoryId,
        },
    });
    return result;
};
exports.categoryService = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
};
//# sourceMappingURL=category.service.js.map