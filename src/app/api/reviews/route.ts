import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../helpers/handleError";

export async function GET() {
  try {
    // Get recent 10 reviews sorted by createdAt desc
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // For each review, fetch user and book info
    const detailedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await prisma.user.findUnique({
          where: { id: review.userId },
          select: { id: true, name: true },
        });

        const book = await prisma.book.findUnique({
          where: { id: review.bookId },
          select: { id: true, title: true, author: true },
        });

        return {
          ...review,
          user,
          book,
        };
      })
    );

    return NextResponse.json({ success: true, reviews: detailedReviews });
  } catch (error) {
    return handleError(error, "Failed to fetch reviews");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, bookId, comment, rating } = await request.json();

    // Basic validation
    if (
      !userId ||
      !bookId ||
      !comment ||
      typeof comment !== "string" ||
      !rating ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid review data" },
        { status: 400 }
      );
    }

    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check book exists
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: { userId, bookId, comment, rating },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to create review");
  }
}

// GET returns latest 10 reviews, each including minimal user and book info.

// POST accepts userId, bookId, comment, and rating (1-5), validates input, verifies user and book exist, then saves review.

