import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  });
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const categoryService = { createCategory, getAllCategory };
