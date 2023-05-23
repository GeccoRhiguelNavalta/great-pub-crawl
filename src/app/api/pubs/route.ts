import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pubs = await prisma.pub.findMany({
    include: {
      reviews: true,
      visitors: true,
    },
  });
  return NextResponse.json(pubs);
}

export async function POST(request: Request) {
  const json = await request.json();
  const pubName = json.name;

  const existingPub = await prisma.pub.findFirst({
    where: {
      name: pubName.name,
    },
  });

  if (existingPub) {
    return new NextResponse(
      JSON.stringify({ error: "This pub already exists." }),
      { status: 400 }
    );
  }

  const created = await prisma.pub.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
