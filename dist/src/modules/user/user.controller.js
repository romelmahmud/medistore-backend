"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const paginationSortingHelper_1 = require("../../helpers/paginationSortingHelper");
const user_service_1 = require("./user.service");
const getAllUser = async (req, res, next) => {
    try {
        const { limit, skip, page } = (0, paginationSortingHelper_1.paginationSortingHelper)(req.query);
        const result = await user_service_1.userService.getAllUser({ limit, skip, page });
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
const getMe = async (req, res, next) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        const result = await user_service_1.userService.getMe(userId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        const status = req.body.status;
        const { userId } = req.params;
        const result = await user_service_1.userService.updateUserStatus(userId, status);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userController = {
    getAllUser,
    getMe,
    updateUserStatus,
};
//# sourceMappingURL=user.controller.js.map