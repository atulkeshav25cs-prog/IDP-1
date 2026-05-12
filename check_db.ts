import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const careers = await prisma.career.findMany();
  console.log("All careers in DB:", careers.map(c => c.title));
  
  const roadmaps = await prisma.roadmap.findMany({ include: { career: true } });
  console.log("All roadmaps in DB:");
  for (const r of roadmaps) {
    const c = JSON.parse(r.content);
    console.log(`- Roadmap for ${r.career.title}: first step is ${c[0]?.title}`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
