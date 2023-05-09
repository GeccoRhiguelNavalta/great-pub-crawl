import { hash } from "bcrypt";
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const hashed = await hash(password, 12);

    const created = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    return (
      NextResponse.json({
        created: {
          email: created.email,
          name: created.name,
        },
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: "failed to create user. try again!",
      }),
      {
        status: 500,
      }
    );
  }
}
