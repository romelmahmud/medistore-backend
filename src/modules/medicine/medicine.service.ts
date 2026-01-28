import { prisma } from "../../lib/prisma";

const getAllMedicine = async () => {
  const result = await prisma.medicine.findMany();

  return result;
};

const getSingleMedicine = async (medicineId: string) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
  });

  return result;
};

export const medicineService = {
  getAllMedicine,
  getSingleMedicine,
};
