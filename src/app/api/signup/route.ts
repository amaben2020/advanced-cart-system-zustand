import User from "@/models/user";
import dbConnect from "@/services/mongod-db";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // dCDonnect syncs your db with mongoose
    await dbConnect();
    const request = await req.json();

    // check if email exists already in DB and return DB
    const saltRounds = 10;
    const hash = bcrypt.hashSync(request.password, saltRounds);

    const userInDb = await User.findOne({
      email: request?.email,
    }).exec();

    if (userInDb) {
      return Response.json(
        {
          message: `User with ${request?.email} already exists`,
        },
        {
          status: 401,
          statusText: `User with ${request?.email} already exists`,
        },
      );
    }

    const userInfo = await User.create({
      firstName: request.firstName,
      password: hash,
      lastName: request.lastName,
      email: request.email,
      role: request.role,
    });
    console.log(userInfo);

    if (userInfo?._id) {
      return Response.json(
        {
          user: userInfo,
        },
        {
          status: 201,
          statusText: "User registration successful",
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
