import { prisma } from "../../lib/prisma";

const getAllMedicine = async () => {
  const result = await prisma.medicine.findMany();

  return result;
};

const medicineService = {
  getAllMedicine,
};
