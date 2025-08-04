import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../../helpers/handleError";

export async function GET(request: NextRequest) {
  try {
    // Extract the ID from the pathname
    // The pathname is something like: /api/books/123
    const pathname = request.nextUrl.pathname;
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!book) {
      return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, book });
  } catch (error) {
    return handleError(error, "Failed to fetch book by ID");
  }
}

export async function PUT(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];

    const data = await request.json();
    const { title, author, price, image, categoryId } = data;

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(author && { author }),
        ...(price && { price }),
        ...(image && { image }),
        ...(categoryId && { categoryId }),
      },
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    return handleError(error, "Failed to update book");
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];

    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Book deleted" });
  } catch (error) {
    return handleError(error, "Failed to delete book");
  }
}
