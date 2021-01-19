import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "9631kunn",
      email: "9631kunn@test.com",
      posts: {
        create: {
          title: "Hello World",
        },
      },
    },
  });
  console.log("Created new user:", newUser);

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });

  console.log("All: users");
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
