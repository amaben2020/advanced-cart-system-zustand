import User from "@/models/user";
import dbConnect from "@/services/mongod-db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    // dCDonnect syncs your db with mongoose
    dbConnect();

    const { email, password } = await req.json();

    const userInDb = await User.findOne({
      email: email,
    }).exec();

    // decrypt password
    const decryptedPassword = await bcrypt.compare(
      password,
      userInDb?.password,
    );

    // return Token TODO:

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
      "secret",
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
        status: 301,
        statusText: "Password doesnt match",
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      error: error,
    });
  }
};
