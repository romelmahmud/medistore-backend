"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const AUTH_BASE_URL = process.env.BETTER_AUTH_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = "System Admin";
async function seedAdmin() {
    try {
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: ADMIN_EMAIL },
            select: { id: true },
        });
        if (existingUser) {
            console.log("✅ Admin already exists. Skipping seed.");
            return;
        }
        const response = await fetch(`${AUTH_BASE_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: AUTH_BASE_URL,
            },
            body: JSON.stringify({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                name: ADMIN_NAME,
            }),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Better Auth signup failed: ${error}`);
        }
        await prisma_1.prisma.user.update({
            where: { email: ADMIN_EMAIL },
            data: {
                role: auth_1.UserRole.ADMIN,
                emailVerified: true,
            },
        });
        console.log("🚀 Admin user seeded successfully");
    }
    catch (error) {
        console.error("❌ Admin seeding failed:", error);
        process.exit(1);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map