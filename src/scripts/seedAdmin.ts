import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

const AUTH_BASE_URL = "http://localhost:8000";

type AdminSeedData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

async function seedAdmin() {
  const adminData: AdminSeedData = {
    name: "Admin Romel",
    email: "admin.romel@mail.com",
    password: "admin@1234#",
    role: UserRole.ADMIN,
  };

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
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
        email: adminData.email,
        password: adminData.password,
        name: adminData.name,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Better Auth signup failed: ${error}`);
    }

    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        role: adminData.role,
        emailVerified: true,
      },
    });

    console.log("🚀 Admin user seeded successfully");
  } catch (error) {
    console.error("❌ Admin seeding failed:", error);
    process.exitCode = 1;
  }
}

seedAdmin();
