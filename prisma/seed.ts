import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  const password = await hash("test", 12);
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password: password,
      name: "Alice",
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
      date: new Date(),
      overall_food_rating: 4,
      overall_drink_rating: 5,
      overall_rating: 4,
      visitors: {
        connect: [{ id: alice.id }, { id: bob.id }],
      },
    },
  });
  const pub2 = await prisma.pub.create({
    data: {
      name: "The Crown",
      date: new Date(),
      overall_food_rating: 3,
      overall_drink_rating: 4,
      overall_rating: 3,
      visitors: {
        connect: [{ id: alice.id }],
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
        connect: { id: alice.id },
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
    `Seeded database with users: ${alice.name}, ${bob.name}; pubs: ${pub1.name}, ${pub2.name}; reviews: ${review1.content}, ${review2.content}`
  );
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
