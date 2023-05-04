import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const json = await request.json();

  const updated = await prisma.user.update({
    where: {
      id: userId,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const deleted = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(deleted);
}
