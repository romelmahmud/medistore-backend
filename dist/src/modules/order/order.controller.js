"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = async (req, res, next) => {
    var _a;
    try {
        const data = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { shippingAddress, items } = data;
        const result = await order_service_1.orderService.createOrder({
            userId,
            shippingAddress,
            items,
        });
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllOrders = async (req, res, next) => {
    try {
        const result = await order_service_1.orderService.getAllOrders();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getCustomerOrders = async (req, res, next) => {
    var _a;
    try {
        const data = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { customerId } = req.params;
        // checking logged in user is getting his/her orders data
        if (userId !== customerId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await order_service_1.orderService.getCustomerOrders(customerId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const result = await order_service_1.orderService.getOrderById(orderId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updatedOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const status = req.body.status;
        const result = await order_service_1.orderService.updateOrderStatus(orderId, status);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.orderController = {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    getOrderById,
    updatedOrderStatus,
};
//# sourceMappingURL=order.controller.js.map