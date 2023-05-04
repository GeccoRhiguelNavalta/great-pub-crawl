import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  const pubId = params.pubsId;
  const pub = await prisma.pub.findUnique({
    where: {
      id: pubId,
    },
  });
  return NextResponse.json(pub);
}

export async function PATCH(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  const pubId = params.pubsId;
  const json = await request.json();

  const updated = await prisma.pub.update({
    where: {
      id: pubId,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  const pubId = params.pubsId;
  const deleted = await prisma.pub.delete({
    where: {
      id: pubId,
    },
  });
  return NextResponse.json(deleted);
}
