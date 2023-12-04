import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const body = await req.json();

    return NextResponse.json(
      {
        body,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
};
