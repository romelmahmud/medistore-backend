import { NextFunction, Request, Response } from "express";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip, page } = paginationSortingHelper(req.query);

    const result = await userService.getAllUser({ limit, skip, page });

    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
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
