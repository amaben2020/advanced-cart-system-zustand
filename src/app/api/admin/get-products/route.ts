import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../../helpers/error-handler";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  try {
    const products = await ProductModel.find();

    return NextResponse.json(
      {
        products,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return ErrorHandler("Something went wrong", 500);
  }
};
