import User from "@/models/user";
import dbConnect from "@/services/mongod-db";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // dCDonnect syncs your db with mongoose
    await dbConnect();

    const request = await req.json();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const email = searchParams.get("email");

    const user = await User.findOne({ email }).exec();

    const saltRounds = 10;
    let hash;

    if (request?.password.length > 0) {
      hash = bcrypt.hashSync(request.password, saltRounds);
    }

    const filter = { email };
    const userInDb = await User.findOneAndUpdate(
      filter,
      {
        firstName:
          request?.firstName === "" ? user?.firstName : request?.firstName,
        lastName: request?.lastName === "" ? user?.lastName : request?.lastName,
        password: hash ?? user?.password,
      },
      {
        new: true,
      },
    ).exec();

    if (userInDb?._id) {
      return Response.json(
        {
          user: userInDb,
        },
        {
          status: 201,
          statusText: "User updated successfully",
        },
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error,
    });
  }
};
