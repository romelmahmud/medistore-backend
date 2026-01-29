import { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicine.service";

const getAllMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await medicineService.getAllMedicine();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { medicineId } = req.params;
    const result = await medicineService.getSingleMedicine(
      medicineId as string,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { medicineId } = req.params;
    const updateData = req.body;
    const result = await medicineService.updateMedicine(
      updateData,
      medicineId as string,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { medicineId } = req.params;

    const result = await medicineService.deleteMedicine(medicineId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const medicineController = {
  getAllMedicine,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
};
