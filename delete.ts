import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.progress.deleteMany({});
  await prisma.roadmap.deleteMany({});
  console.log("Deleted old roadmaps");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
