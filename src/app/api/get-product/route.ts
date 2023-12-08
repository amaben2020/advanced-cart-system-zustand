import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    // const
    // const product =
  } catch (error) {
    console.log(error);
  }
};
