import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomepageContent from "@/models/HomepageContent";
import { auth } from "@/lib/auth";
import { seedHomepage } from "@/lib/seed-data";

export async function GET() {
  try {
    await connectDB();
    const content = await HomepageContent.findOne().lean();
    return NextResponse.json(content ?? seedHomepage);
  } catch (error) {
    console.error("Homepage GET error:", error);
    return NextResponse.json(seedHomepage);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const content = await HomepageContent.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    }).lean();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Homepage PUT error:", error);
    return NextResponse.json({ error: "Failed to update homepage" }, { status: 500 });
  }
}
