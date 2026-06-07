import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Contact GET error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
