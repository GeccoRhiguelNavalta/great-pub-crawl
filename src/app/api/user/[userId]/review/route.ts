import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const reviews = await prisma.review.findMany({
    where: {
      authorId: userId,
    },
  });
  return NextResponse.json(reviews);
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const json = await request.json();
  const created = await prisma.review.create({
    data: {
      ...json,
      authorId: userId,
    },
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
