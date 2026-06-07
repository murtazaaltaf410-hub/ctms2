import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const productId = new URL(request.url).searchParams.get("productId");
    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const review = await Review.create(body);

    const reviews = await Review.find({ productId: body.productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(body.productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
