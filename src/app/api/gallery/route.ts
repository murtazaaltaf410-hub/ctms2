import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const category = new URL(request.url).searchParams.get("category");
    const filter =
      category && category !== "all"
        ? { category: category as "cookies" | "bouquets" | "events" | "customers" }
        : {};
    const images = await GalleryImage.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
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
    const image = await GalleryImage.create(body);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 });
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
    await GalleryImage.findByIdAndDelete(id);
    return NextResponse.json({ message: "Gallery image deleted" });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
