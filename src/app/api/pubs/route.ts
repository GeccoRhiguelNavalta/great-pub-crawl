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
  const json = await request.json();
  const pubName = json.name;

  const existingPub = await prisma.pub.findFirst({
    where: {
      name: pubName.name,
    },
  });

  if (existingPub) {
    return new NextResponse(
      JSON.stringify({ error: "This pub already exists." }),
      { status: 400 }
    );
  }

  const created = await prisma.pub.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
