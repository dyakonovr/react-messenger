import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users: Omit<User, "id">[] = Array.from({ length: 50 }).map(() => ({
    nickname: faker.internet.userName(),
    login: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar()
  }));

  // Insert users into the database
  await prisma.user.createMany({ data: users });
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
