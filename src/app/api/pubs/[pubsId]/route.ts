import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  try {
    const pubId = params.pubsId;
    const pub = await prisma.pub.findUnique({
      where: {
        id: pubId,
      },
    });
    return NextResponse.json(pub);
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { pubsId: string } }
) {
  try {
    const pubId = params.pubsId;
    const json = await request.json();
    const updated = await prisma.pub.update({
      where: {
        id: pubId,
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
  { params }: { params: { pubsId: string } }
) {
  try {
    const pubId = params.pubsId;
    const deleted = await prisma.pub.delete({
      where: {
        id: pubId,
      },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.log(error);
  }
}
