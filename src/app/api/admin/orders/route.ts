import Order from "@/models/orders";
import dbConnect from "@/services/mongod-db";
import crypto from "crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//Paystack webhook integration

// the secret must be same as the Paystack sec key

const secret = process.env.PAYSTACK_SECRET_KEY!;
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const headersList = headers();

    const referer = headersList.get("x-paystack-signature");

    const cType = headersList.get("Content-Type");

    const body = await req.json();

    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash == referer && cType === "application/json") {
      const createdOrder = await Order.create({
        total: body?.data?.fees,
        reference: body?.data?.reference,
        payment_status: body?.data?.status,
        email: body?.data?.customer.email,
      });

      return NextResponse.json({
        message: "success",
        data: createdOrder,
      });
    } else {
      return NextResponse.json({
        message: "x-paystack-signature incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
};
