import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const test = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: password,
      name: "Test",
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      password: password,
      name: "Bob",
    },
  });

  // Create some pubs
  const pub1 = await prisma.pub.create({
    data: {
      name: "The Red Lion",
      visitors: {
        connect: [{ id: test.id }, { id: bob.id }],
      },
    },
  });
  const pub2 = await prisma.pub.create({
    data: {
      name: "The Crown",
      visitors: {
        connect: [{ id: test.id }],
      },
    },
  });

  // Create some reviews
  const review1 = await prisma.review.create({
    data: {
      content: "Great pub, would recommend!",
      food_rating: 4,
      drink_rating: 5,
      rating: 4,
      pub: {
        connect: { id: pub1.id },
      },
      author: {
        connect: { id: test.id },
      },
    },
  });
  const review2 = await prisma.review.create({
    data: {
      content: "Not bad, could be better",
      food_rating: 3,
      drink_rating: 4,
      rating: 3,
      pub: {
        connect: { id: pub2.id },
      },
      author: {
        connect: { id: bob.id },
      },
    },
  });

  console.log(
    `Seeded database with users: ${test.name}, ${bob.name}; pubs: ${pub1.name}, ${pub2.name}; reviews: ${review1.content}, ${review2.content}`
  );
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
