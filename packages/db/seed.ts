import prisma from "./src/index";
import { hash } from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Create a test user
  const hashedPassword = await hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@baselinedrivers.com" },
    update: {},
    create: {
      email: "test@baselinedrivers.com",
      name: "Jake Gyll",
      emailVerified: true,
    },
  });

  console.log("✅ Test user created:");
  console.log("   Email: test@baselinedrivers.com");
  console.log("   Password: password123");
  console.log("   Name: Jake Gyll");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
