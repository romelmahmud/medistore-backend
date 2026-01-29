import { prisma } from "../../lib/prisma";
import { MedicineUpdateType } from "./medicine.type";

const getAllMedicine = async () => {
  // todo : add filter, sort
  const result = await prisma.medicine.findMany();

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
};
