import UserModel from "@/models/user";
import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const url = new URL(req.url);

    const email = new URLSearchParams(url.searchParams).get("email");

    const user = await UserModel.findOne({ email }).exec();

    return NextResponse.json(
      {
        user: {
          role: user?.role,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        user: "User Not found",
      },
      {
        status: 401,
      },
    );
  }
};
