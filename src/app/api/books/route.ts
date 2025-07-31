import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../helpers/handleError";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const books = await prisma.book.findMany({
      where: {
        ...(category && { categoryId: category }),
        ...(featured && { featured: featured === "true" }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { author: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return NextResponse.json({ success: true, books });
  } catch (error) {
    return handleError(error, "Failed to fetch books");
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { title, author, price, image, categoryId, featured } = data;

    if (!title || !author || !price || !image || !categoryId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        image,
        categoryId,
        featured: featured ?? false,
      },
    });

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to create book");
  }
}
