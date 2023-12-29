import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../../helpers/error-handler";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = await req.json();

    const newProduct = await ProductModel.create({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });

    return NextResponse.json(
      {
        product: newProduct,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return ErrorHandler("Something went wrong", 500);
  }
};
