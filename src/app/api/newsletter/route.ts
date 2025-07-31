import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../helpers/handleError";

function validateEmail(email: string) {
  // Simple regex email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if email already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json({ success: true, subscriber }, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to subscribe to newsletter");
  }
}
/*
 Email format validation

Duplicate checks

Prisma DB insert

Custom error handler (handleError)

Typed request via NextRequest
*/ 