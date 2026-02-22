import { NextFunction, Request, Response } from "express";
export declare const orderController: {
    createOrder: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCustomerOrders: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatedOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=order.controller.d.ts.map