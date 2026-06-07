import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import CustomOrder from "@/models/CustomOrder";
import ContactMessage from "@/models/ContactMessage";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [productCount, orderCount, customOrderCount, unreadMessages, orders, customOrders] =
      await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        CustomOrder.countDocuments(),
        ContactMessage.countDocuments({ read: false }),
        Order.find().lean(),
        CustomOrder.find().lean(),
      ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const pendingCustom = customOrders.filter((o) => o.status === "pending").length;

    return NextResponse.json({
      productCount,
      orderCount,
      customOrderCount,
      unreadMessages,
      totalRevenue,
      pendingOrders: pendingOrders + pendingCustom,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
