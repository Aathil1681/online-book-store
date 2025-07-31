import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../../helpers/handleError";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!book) {
      return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, book });
  } catch (error) {
    return handleError(error, "Failed to fetch book by ID");
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    const { title, author, price, image, featured, categoryId } = data;

    const book = await prisma.book.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(author && { author }),
        ...(price && { price }),
        ...(image && { image }),
        ...(typeof featured === "boolean" && { featured }),
        ...(categoryId && { categoryId }),
      },
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    return handleError(error, "Failed to update book");
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.book.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: "Book deleted" });
  } catch (error) {
    return handleError(error, "Failed to delete book");
  }
}
