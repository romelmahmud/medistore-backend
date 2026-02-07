import { NextFunction, Request, Response } from "express";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { medicineService } from "./medicine.service";

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await medicineService.createMedicine(data);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const manufacturer = req.query.manufacturer as string | undefined;
    const minPrice = req.query.minPrice as string | undefined;
    const maxPrice = req.query.maxPrice as string | undefined;
    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;

    const options = paginationSortingHelper(req.query);

    const result = await medicineService.getAllMedicine({
      search,
      category,
      manufacturer,
      min,
      max,
      page: options.page,
      limit: options.limit,
      skip: options.skip,
      sortBy: options.sortBy,
      sortOrder: options.sortOrder,
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
  createMedicine,
};
