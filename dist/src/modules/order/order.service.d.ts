import { OrderStatus } from "../../../generated/prisma/client";
type CreateOrderInput = {
    userId: string;
    shippingAddress: string;
    items: {
        medicineId: string;
        quantity: number;
    }[];
};
export declare const orderService: {
    createOrder: ({ userId, shippingAddress, items, }: CreateOrderInput) => Promise<any>;
    getAllOrders: () => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
    }[]>;
    getCustomerOrders: (userId: string) => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
    }[]>;
    getOrderById: (orderId: string) => Promise<({
        items: ({
            medicine: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
    }) | null>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
    }>;
};
export {};
//# sourceMappingURL=order.service.d.ts.map