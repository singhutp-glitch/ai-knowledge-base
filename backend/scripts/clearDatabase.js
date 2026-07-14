import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.user.deleteMany()

  console.log("Database cleared");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });