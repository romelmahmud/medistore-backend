"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineService = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../lib/prisma");
const createMedicine = async (payload) => {
    const result = await prisma_1.prisma.medicine.create({
        data: payload,
    });
    return result;
};
const getAllMedicine = async ({ search, category, manufacturer, min, max, page, limit, skip, sortBy, sortOrder, isActive, }) => {
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
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
    if ((min !== undefined && !Number.isNaN(min)) ||
        (max !== undefined && !Number.isNaN(max))) {
        addCondition.push({
            price: {
                ...(min !== undefined &&
                    !Number.isNaN(min) && {
                    gte: new client_1.Prisma.Decimal(min),
                }),
                ...(max !== undefined &&
                    !Number.isNaN(max) && {
                    lte: new client_1.Prisma.Decimal(max),
                }),
            },
        });
    }
    if (typeof isActive === "boolean") {
        addCondition.push({
            isActive,
        });
    }
    const result = await prisma_1.prisma.medicine.findMany({
        take: limit,
        skip,
        where: {
            AND: addCondition,
        },
        include: {
            category: true,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const count = await prisma_1.prisma.medicine.count({
        where: {
            AND: addCondition,
        },
    });
    const formattedResult = result.map((med) => ({
        ...med,
        price: Number(med.price),
    }));
    return {
        meta: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        },
        data: formattedResult,
    };
};
const getSingleMedicine = async (medicineId) => {
    const result = await prisma_1.prisma.medicine.findUniqueOrThrow({
        where: {
            id: medicineId,
        },
        include: {
            category: true,
        },
    });
    return {
        ...result,
        price: Number(result.price),
    };
};
const getMedicineByCategory = async (categoryId) => {
    const result = await prisma_1.prisma.medicine.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
    });
    return result.map((med) => ({
        ...med,
        price: Number(med.price),
    }));
};
const updateMedicine = async (payload, medicineId) => {
    const result = await prisma_1.prisma.medicine.update({
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
const deleteMedicine = async (medicineId) => {
    const result = await prisma_1.prisma.medicine.delete({
        where: {
            id: medicineId,
        },
    });
    return result;
};
exports.medicineService = {
    getAllMedicine,
    getSingleMedicine,
    updateMedicine,
    deleteMedicine,
    createMedicine,
    getMedicineByCategory,
};
//# sourceMappingURL=medicine.service.js.map