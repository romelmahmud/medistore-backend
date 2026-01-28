import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response) => {
  const data = req.body;

  const result = await categoryService.createCategory(data);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const categoryController = {
  createCategory,
  getAllCategory,
};
