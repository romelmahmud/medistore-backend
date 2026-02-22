"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prismaNamespace_1 = require("../../../generated/prisma/internal/prismaNamespace");
const prisma_1 = require("../../lib/prisma");
const createOrder = async ({ userId, shippingAddress, items, }) => {
    return await prisma_1.prisma.$transaction(async (tx) => {
        //medicines (price + stock)
        const medicines = await tx.medicine.findMany({
            where: {
                id: { in: items.map((i) => i.medicineId) },
            },
            select: {
                id: true,
                price: true,
                stock: true,
            },
        });
        if (medicines.length !== items.length) {
            throw new Error("One or more medicines not found");
        }
        //  order items + calculate total
        let totalAmount = new prismaNamespace_1.Decimal(0);
        const orderItems = items.map((item) => {
            const medicine = medicines.find((m) => m.id === item.medicineId);
            if (medicine.stock < item.quantity) {
                throw new Error("Insufficient stock");
            }
            const itemTotal = medicine.price.mul(item.quantity);
            totalAmount = totalAmount.add(itemTotal);
            return {
                medicineId: medicine.id,
                quantity: item.quantity,
                price: medicine.price, // snapshot price
            };
        });
        //  Creating Order
        const order = await tx.order.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                shippingAddress,
                totalAmount,
                paymentMethod: "COD",
                status: "PLACED",
            },
        });
        // Create OrderItems
        await tx.orderItem.createMany({
            data: orderItems.map((item) => ({
                ...item,
                orderId: order.id,
            })),
        });
        // Adjust stock
        for (const item of items) {
            await tx.medicine.update({
                where: { id: item.medicineId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }
        return order;
    });
};
const getAllOrders = async () => {
    const result = await prisma_1.prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getCustomerOrders = async (userId) => {
    const result = await prisma_1.prisma.order.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getOrderById = async (orderId) => {
    const result = await prisma_1.prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    medicine: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return result;
};
const updateOrderStatus = async (orderId, status) => {
    const result = await prisma_1.prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
        },
    });
    return result;
};
exports.orderService = {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    getOrderById,
    updateOrderStatus,
};
//# sourceMappingURL=order.service.js.map