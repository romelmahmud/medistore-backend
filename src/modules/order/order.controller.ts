import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { shippingAddress, items } = data;

    const result = await orderService.createOrder({
      userId,
      shippingAddress,
      items,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const userId = req.user?.id;
    const { customerId } = req.params;
    // checking logged in user is getting his/her orders data
    if (userId !== customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await orderService.getCustomerOrders(customerId as string);
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
  getAllOrders,
  getCustomerOrders,
};
