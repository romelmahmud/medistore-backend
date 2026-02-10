import { Medicine } from "../../../generated/prisma/client";
import { Decimal } from "../../../generated/prisma/internal/prismaNamespace";
import { prisma } from "../../lib/prisma";

type CreateOrderInput = {
  userId: string;
  shippingAddress: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
};

const createOrder = async ({
  userId,
  shippingAddress,
  items,
}: CreateOrderInput) => {
  return await prisma.$transaction(async (tx: any) => {
    //medicines (price + stock)
    const medicines = await tx.medicine.findMany({
      where: {
        id: { in: items.map((i) => i.medicineId) },
      },
      select: {
        id: true,
        price: true,
        stock: true,
      },
    });

    if (medicines.length !== items.length) {
      throw new Error("One or more medicines not found");
    }

    //  order items + calculate total
    let totalAmount = new Decimal(0);

    const orderItems = items.map((item) => {
      const medicine = medicines.find(
        (m: Medicine) => m.id === item.medicineId,
      )!;

      if (medicine.stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      const itemTotal = medicine.price.mul(item.quantity);
      totalAmount = totalAmount.add(itemTotal);

      return {
        medicineId: medicine.id,
        quantity: item.quantity,
        price: medicine.price, // snapshot price
      };
    });

    //  Creating Order
    const order = await tx.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        shippingAddress,
        totalAmount,
        paymentMethod: "COD",
        status: "PLACED",
      },
    });

    // Create OrderItems
    await tx.orderItem.createMany({
      data: orderItems.map((item) => ({
        ...item,
        orderId: order.id,
      })),
    });

    // Adjust stock
    for (const item of items) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  });
};

const getAllOrders = async () => {
  const result = await prisma.order.findMany();

  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
};
