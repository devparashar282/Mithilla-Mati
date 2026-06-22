import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, total, paymentMode } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    await connectToDatabase();

    const orderId = "MM" + Math.floor(100000 + Math.random() * 900000);
    const productName = items.map((i: any) => i.name).join(", ");
    const quantity = items.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
    const productImage = items.length > 0 ? items[0].image : "";

    const newOrder = await Order.create({
      userId: (session.user as any).id,
      orderId,
      productName: productName.length > 100 ? productName.substring(0, 97) + "..." : productName,
      productImage,
      variant: items[0].variant || "Standard", // Simplification for schema
      quantity,
      amount: total,
      paymentStatus: paymentMode === "Cash on Delivery (COD)" ? "Pending" : "Paid",
      paymentMethod: paymentMode,
      currentStep: 0,
    });

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const orders = await Order.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
