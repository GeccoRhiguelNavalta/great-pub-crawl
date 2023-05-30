import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const reviews: Record<any, any>[] = await prisma.review.findMany({
      where: {
        authorId: userId,
      },
    });
    const pubIds = reviews.map((review) => review.pubId);
    const pubs = await prisma.pub.findMany({
      where: {
        id: { in: pubIds },
      },
      select: {
        name: true,
        id: true,
      },
    });

    const reviewWithPub = reviews.map((review) => {
      const pub = pubs.find((pub) => pub.id === review.pubId);
      return { ...review, pub: pub?.name };
    });

    return NextResponse.json(reviewWithPub);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const json = await request.json();
    const pubName = json.name;
    const pubId = await prisma.pub.findFirst({
      where: {
        name: pubName,
      },
      select: {
        id: true,
      },
    });

    const pub = await prisma.pub.upsert({
      where: {
        id: pubId?.id,
      },
      create: {
        name: pubName,
        visitors: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        visitors: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const createdReview = await prisma.review.create({
      data: {
        content: json.content,
        food_rating: json.food_rating,
        drink_rating: json.drink_rating,
        rating: json.rating,
        pub: {
          connect: {
            id: pub.id,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(createdReview), { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
