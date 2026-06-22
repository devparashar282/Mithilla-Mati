import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const userId = (session.user as any).id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(o => o.currentStep === 6).length;
    const cancelledOrders = orders.filter(o => o.isCancelled).length;

    return NextResponse.json({
      user,
      stats: {
        totalOrders,
        deliveredOrders,
        cancelledOrders,
        rewardPoints: user.rewardPoints,
        walletBalance: user.walletBalance,
      },
      recentOrders: orders.slice(0, 5),
    });

  } catch (error) {
    console.error("Dashboard Data Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
