import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pubs = await prisma.pub.findMany();
  return NextResponse.json(pubs);
}

export async function POST(request: Request) {
  const json = await request.json();
  const created = await prisma.pub.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
