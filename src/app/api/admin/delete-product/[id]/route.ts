import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  // get product id

  // delete product from db

  // return a success message

  await dbConnect();

  try {
    const productId = params.id;
    console.log(productId);

    await ProductModel.findByIdAndDelete({
      _id: productId,
    }).exec();

    return NextResponse.json({
      message: `Product ${productId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
