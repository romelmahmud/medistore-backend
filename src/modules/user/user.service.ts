import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUser = async ({
  limit,
  skip,
  page,
}: {
  limit: number;
  skip: number;
  page: number;
}) => {
  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const count = await prisma.user.count();
  return {
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
    data: result,
  };
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
