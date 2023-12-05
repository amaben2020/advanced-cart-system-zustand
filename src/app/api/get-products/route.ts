import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { TProduct } from "@/store/useProductsStore";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../helpers/error-handler";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  // filtration
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const category = searchParams.get("category");
  const product = searchParams.get("product");
  console.log(product);
  console.log(category);

  let query: any;

  if (category?.length) {
    const isMultiple = category.split(",").length > 1;

    const filterByCategories = isMultiple ? category.split(",") : category;

    query = ProductModel.find({
      category: filterByCategories,
    });
  } else if (product?.length) {
    query = ProductModel.find({
      title: product,
    });
  } else {
    query = ProductModel.find();
  }

  // sort
  // filter
  // search

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
