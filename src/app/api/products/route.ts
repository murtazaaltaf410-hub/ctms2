import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort");

    const query: Record<string, unknown> = {};
    if (category && category !== "all") query.category = category;
    if (featured === "true") query.featured = true;
    if (search) query.$text = { $search: search };

    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    switch (sort) {
      case "price-asc": sortQuery = { price: 1 }; break;
      case "price-desc": sortQuery = { price: -1 }; break;
      case "name-asc": sortQuery = { name: 1 }; break;
      case "name-desc": sortQuery = { name: -1 }; break;
      case "rating": sortQuery = { rating: -1 }; break;
    }

    const products = await Product.find(query).sort(sortQuery).lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const slug = body.slug || slugify(body.name);

    const product = await Product.create({ ...body, slug });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
