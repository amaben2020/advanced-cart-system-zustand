import User from "@/models/user";
import dbConnect from "@/services/mongod-db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    // dCDonnect syncs your db with mongoose, always invoke first
    await dbConnect();

    const { email, password } = await req.json();

    const userInDb = await User.findOne({
      email: email,
    }).exec();

    // decrypt password to compare with raw password
    const decryptedPassword = await bcrypt.compare(
      password,
      userInDb?.password,
    );

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          id: userInDb?._id,
          firstName: userInDb?.firstName,
          lastName: userInDb?.lastName,
          email: userInDb?.email,
        },
      },
      process.env.JWT_SECRET!,
    );

    // if pwd in db is same as decrypted
    if (decryptedPassword) {
      return Response.json({
        status: 200,
        statusText: "User login successful",
        user: {
          user: userInDb,
          token,
        },
      });
    } else {
      return Response.json({
        status: 401,
        statusText: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error,
    });
  }
};
