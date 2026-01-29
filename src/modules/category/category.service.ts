import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { CategoryUpdateType } from "./category.type";

const createCategory = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const updateCategory = async (
  payload: CategoryUpdateType,
  categoryId: string,
) => {
  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (categoryId: string) => {
  const result = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return result;
};
export const categoryService = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
