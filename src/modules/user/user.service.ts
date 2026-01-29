import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUserStatus = async (userId: string, status: Status) => {
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });

  return updateUser;
};

export const userService = {
  getAllUser,
  updateUserStatus,
};
