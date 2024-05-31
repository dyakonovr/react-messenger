import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 50 }).map(() => ({
    nickname: faker.internet.userName(),
    login: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    role_id: 1
  }));

  // Insert users into the database
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
