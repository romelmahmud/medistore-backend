import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

const AUTH_BASE_URL = process.env.BETTER_AUTH_URL!;
const ADMIN_EMAIL = "test.admin@gmail.com";
const ADMIN_PASSWORD = "password1234";
const ADMIN_NAME = "Test Admin";

async function seedAdmin() {
  try {
    const existingUser = await prisma.user.findUnique({
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

    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: {
        role: UserRole.ADMIN,
        emailVerified: true,
      },
    });

    console.log("🚀 Admin user seeded successfully");
  } catch (error) {
    console.error("❌ Admin seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
