import { NextFunction, Request, Response } from "express";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = paginationSortingHelper(req.query);

    const result = await userService.getAllUser({
      limit: options.limit,
      skip: options.skip,
      page: options.page,
    });

    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await userService.getMe(userId as string);
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
  getMe,
  updateUserStatus,
};
