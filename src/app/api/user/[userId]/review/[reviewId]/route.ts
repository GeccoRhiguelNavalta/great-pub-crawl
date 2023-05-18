import { prisma } from "../../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  const reviewId = params.reviewId;
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });
  return NextResponse.json(review);
}

export async function PATCH(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  const json = await request.json();
  const reviewId = params.reviewId;
  const updated = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  const reviewId = params.reviewId;
  console.log(reviewId);

  const deleted = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  return NextResponse.json(deleted);
}
