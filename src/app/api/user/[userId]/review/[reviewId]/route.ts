import { prisma } from "../../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const reviewId = params.reviewId;
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const json = await request.json();
    const reviewId = params.reviewId;
    const updated = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: json,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const reviewId = params.reviewId;
    const deletedReview = await prisma.review.delete({
      where: {
        id: reviewId,
      },
      include: {
        author: true,
        pub: true,
      },
    });

    const pubId = deletedReview.pubId;
    const authorId = deletedReview.authorId;

    await prisma.pub.update({
      where: {
        id: pubId,
      },
      data: {
        visitors: {
          disconnect: {
            id: authorId,
          },
        },
      },
    });

    return NextResponse.json(deletedReview);
  } catch (error) {
    console.log(error);
  }
}
