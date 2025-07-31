import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../helpers/handleError";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return handleError(error, "Failed to fetch categories");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { success: false, message: "Category name is required and must be a string" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({ data: { name } });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to create category");
  }
}
//GET: returns all categories sorted by name.

//POST: creates a new category with simple validation and duplicate check.