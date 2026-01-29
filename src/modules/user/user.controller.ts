import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUser();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.body.status;

    const { userId } = req.params;

    const result = await userService.updateUserStatus(userId as string, status);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUser,
  updateUserStatus,
};
