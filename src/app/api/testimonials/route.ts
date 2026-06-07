import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Testimonials GET error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
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
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Testimonials POST error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await request.json();
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Testimonials DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
