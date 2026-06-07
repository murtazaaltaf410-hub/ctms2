import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CustomOrder from "@/models/CustomOrder";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const orders = await CustomOrder.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Custom orders GET error:", error);
    return NextResponse.json({ error: "Failed to fetch custom orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const order = await CustomOrder.create(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Custom orders POST error:", error);
    return NextResponse.json({ error: "Failed to submit custom order" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id, status } = await request.json();
    const order = await CustomOrder.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return NextResponse.json(order);
  } catch (error) {
    console.error("Custom orders PATCH error:", error);
    return NextResponse.json({ error: "Failed to update custom order" }, { status: 500 });
  }
}
