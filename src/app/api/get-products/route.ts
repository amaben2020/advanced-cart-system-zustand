import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { TProduct } from "@/store/useProductsStore";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../helpers/error-handler";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  // filtration and search logic
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const category = searchParams.get("category");
  const product = searchParams.get("product");

  let query: any;

  if (category?.length) {
    const isMultiple = category.split(",").length > 1;
    const filterByCategories = isMultiple ? category.split(",") : category;

    // filtering by category
    query = ProductModel.find({
      category: filterByCategories,
    });
    // filtering by title i.e search
  } else if (product?.length && typeof product !== null) {
    query = ProductModel.find({
      title: product,
    });
  } else {
    query = ProductModel.find();
  }

  // sort logic

  // build the model with the query conditionally then finally execute

  try {
    const products: Awaited<TProduct[]> = await query.exec();

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
