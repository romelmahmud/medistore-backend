import { Medicine, Prisma } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { MedicineUpdateType } from "./medicine.type";

const createMedicine = async (payload: Medicine) => {
  const result = await prisma.medicine.create({
    data: payload,
  });

  return result;
};

const getAllMedicine = async ({
  search,
  category,
  manufacturer,
  min,
  max,
}: {
  search: string | undefined;
  category: string | undefined;
  manufacturer: string | undefined;
  min: number | undefined;
  max: number | undefined;
}) => {
  const addCondition: MedicineWhereInput[] = [];

  if (search) {
    addCondition.push({
      OR: [
        {
          name: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search as string,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (category) {
    addCondition.push({
      category: {
        name: category,
      },
    });
  }

  if (manufacturer) {
    addCondition.push({
      manufacturer: {
        contains: manufacturer,
        mode: "insensitive",
      },
    });
  }

  if (
    (min !== undefined && !Number.isNaN(min)) ||
    (max !== undefined && !Number.isNaN(max))
  ) {
    addCondition.push({
      price: {
        ...(min !== undefined &&
          !Number.isNaN(min) && {
            gte: new Prisma.Decimal(min),
          }),
        ...(max !== undefined &&
          !Number.isNaN(max) && {
            lte: new Prisma.Decimal(max),
          }),
      },
    });
  }

  const result = await prisma.medicine.findMany({
    where: {
      AND: addCondition,
    },
    include: {
      category: true,
    },
  });

  const formattedResult = result.map((med) => ({
    ...med,
    price: Number(med.price),
  }));
  return formattedResult;
};

const getSingleMedicine = async (medicineId: string) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
  });

  return {
    ...result,
    price: Number(result.price),
  };
};

const updateMedicine = async (
  payload: MedicineUpdateType,
  medicineId: string,
) => {
  const result = await prisma.medicine.update({
    where: {
      id: medicineId,
    },
    data: payload,
  });

  return {
    ...result,
    price: Number(result.price),
  };
};

const deleteMedicine = async (medicineId: string) => {
  const result = await prisma.medicine.delete({
    where: {
      id: medicineId,
    },
  });

  return result;
};

export const medicineService = {
  getAllMedicine,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
  createMedicine,
};
