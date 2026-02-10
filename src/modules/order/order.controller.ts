import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;

    const data = req.body;
    const { shippingAddress, items } = data;

    const result = await orderService.createOrder({
      userId,
      shippingAddress,
      items,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  createOrder,
};
