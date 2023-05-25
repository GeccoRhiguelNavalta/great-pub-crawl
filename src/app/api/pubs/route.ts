import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pubs = await prisma.pub.findMany({
    include: {
      reviews: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
      visitors: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const pubsWithAuthorName = pubs.map((pub) => {
    const reviewsWithAuthorName = pub.reviews.map((review) => {
      return {
        ...review,
        authorName: review.author?.name || "Unknown",
      };
    });

    return {
      ...pub,
      reviews: reviewsWithAuthorName,
    };
  });

  return NextResponse.json(pubsWithAuthorName);
}

export async function POST(request: Request) {
  const { name } = await request.json();

  const existingPub = await prisma.pub.findFirst({
    where: {
      name: name,
    },
  });

  if (existingPub) {
    return new NextResponse(
      JSON.stringify({ error: "This pub already exists." }),
      { status: 400 }
    );
  } else {
    const created = await prisma.pub.create({
      data: {
        name: name,
      },
    });
    return new NextResponse(JSON.stringify(created), { status: 201 });
  }
}
