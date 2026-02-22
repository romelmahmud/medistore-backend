"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const getAllCategory = async (req, res, next) => {
    try {
        const result = await category_service_1.categoryService.getAllCategory();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getCategoryById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const result = await category_service_1.categoryService.getCategoryById(categoryId);
        if (result === null)
            res.status(404).json({
                success: false,
                data: null,
            });
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const createCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await category_service_1.categoryService.createCategory(data);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const { categoryId } = req.params;
        const result = await category_service_1.categoryService.updateCategory(data, categoryId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const result = await category_service_1.categoryService.deleteCategory(categoryId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.categoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
};
//# sourceMappingURL=category.controller.js.map