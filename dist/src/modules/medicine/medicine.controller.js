"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineController = void 0;
const paginationSortingHelper_1 = require("../../helpers/paginationSortingHelper");
const medicine_service_1 = require("./medicine.service");
const createMedicine = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await medicine_service_1.medicineService.createMedicine(data);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllMedicine = async (req, res, next) => {
    try {
        const search = req.query.search;
        const category = req.query.category;
        const manufacturer = req.query.manufacturer;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const min = minPrice ? Number(minPrice) : undefined;
        const max = maxPrice ? Number(maxPrice) : undefined;
        const isActive = req.query.isActive
            ? req.query.isActive === "true"
                ? true
                : req.query.isActive === "false"
                    ? false
                    : undefined
            : undefined;
        const options = (0, paginationSortingHelper_1.paginationSortingHelper)(req.query);
        const result = await medicine_service_1.medicineService.getAllMedicine({
            search,
            category,
            manufacturer,
            min,
            max,
            page: options.page,
            limit: options.limit,
            skip: options.skip,
            sortBy: options.sortBy,
            sortOrder: options.sortOrder,
            isActive,
        });
        res.status(200).json({
            success: true,
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleMedicine = async (req, res, next) => {
    try {
        const { medicineId } = req.params;
        const result = await medicine_service_1.medicineService.getSingleMedicine(medicineId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getMedicineByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const result = await medicine_service_1.medicineService.getMedicineByCategory(categoryId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateMedicine = async (req, res, next) => {
    try {
        const { medicineId } = req.params;
        const updateData = req.body;
        const result = await medicine_service_1.medicineService.updateMedicine(updateData, medicineId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteMedicine = async (req, res, next) => {
    try {
        const { medicineId } = req.params;
        const result = await medicine_service_1.medicineService.deleteMedicine(medicineId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.medicineController = {
    getAllMedicine,
    getSingleMedicine,
    updateMedicine,
    deleteMedicine,
    createMedicine,
    getMedicineByCategory,
};
//# sourceMappingURL=medicine.controller.js.map