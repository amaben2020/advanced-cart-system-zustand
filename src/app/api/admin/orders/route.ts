import crypto from "crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// the secret must be same as the paystack sec key
const secret = process.env.PAYSTACK_SECRET_KEY!;
export const POST = async (req: NextRequest) => {
  try {
    const headersList = headers();

    const referer = headersList.get("x-paystack-signature");

    const cType = headersList.get("Content-Type");

    const body = await req.json();

    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash == referer && cType === "application/json") {
      // create the order model here POST and another to GET
      return NextResponse.json({
        message: "success",
        body,
      });
    } else {
      return NextResponse.json({
        message: "x-paystack-signature incorrect",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};
