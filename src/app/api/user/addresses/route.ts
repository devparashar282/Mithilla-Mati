import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select("addresses");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ addresses: user.addresses || [] }, { status: 200 });
  } catch (error) {
    console.error("Addresses GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate required fields
    const requiredFields = ["fullName", "mobile", "addressLine1", "city", "state", "pincode"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newAddress = {
      id: Date.now().toString(),
      fullName: data.fullName,
      mobile: data.mobile,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || "",
      city: data.city,
      state: data.state,
      country: data.country || "India",
      pincode: data.pincode,
      isDefault: data.isDefault || false,
    };

    if (!user.addresses) {
      user.addresses = [];
    }

    // If this is default, remove default from others
    if (newAddress.isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    // If this is the first address, make it default automatically
    if (user.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json({ message: "Address added successfully", addresses: user.addresses }, { status: 201 });
  } catch (error) {
    console.error("Addresses POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    if (!data.id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const addressIndex = user.addresses.findIndex((a: any) => a.id === data.id);
    if (addressIndex === -1) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // If this is set to default, remove default from others
    if (data.isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    // Update fields
    const updatedAddress = {
      ...user.addresses[addressIndex].toObject(),
      ...data,
      id: user.addresses[addressIndex].id // Protect ID
    };

    user.addresses[addressIndex] = updatedAddress;
    await user.save();

    return NextResponse.json({ message: "Address updated successfully", addresses: user.addresses }, { status: 200 });
  } catch (error) {
    console.error("Addresses PUT Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.addresses = user.addresses.filter((a: any) => a.id !== addressId);
    
    // If we deleted the default, set a new default if any remain
    if (user.addresses.length > 0 && !user.addresses.some((a: any) => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({ message: "Address deleted successfully", addresses: user.addresses }, { status: 200 });
  } catch (error) {
    console.error("Addresses DELETE Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
