import Order from "@/models/orders";
import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await dbConnect();

  try {
    const allOrders = await Order.find();

    return NextResponse.json(
      {
        success: true,
        orders: allOrders,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
