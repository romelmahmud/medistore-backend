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
    take: limit,
    skip,
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

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
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
  getMe,
};
