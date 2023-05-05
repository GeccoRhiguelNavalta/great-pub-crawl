import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  const pubId = params.pubsId;
  const reviews = await prisma.review.findMany({
    where: {
      pubId: pubId,
    },
  });
  return NextResponse.json(reviews);
}
