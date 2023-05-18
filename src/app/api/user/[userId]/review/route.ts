import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
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
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
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
  if (pubId !== null) {
    const createdReview = await prisma.review.create({
      data: {
        content: json.content as string,
        food_rating: json.food_rating as number,
        drink_rating: json.drink_rating as number,
        rating: json.rating as number,
        pubId: pubId.id,
        authorId: userId as string,
      },
    });
    return new NextResponse(JSON.stringify(createdReview), { status: 201 });
  }
}
