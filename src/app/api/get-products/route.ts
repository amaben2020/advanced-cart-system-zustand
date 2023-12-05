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
  const sortBy = searchParams.get("sortBy");
  const direction = searchParams.get("direction");

  let query: any;
  let filterByCategories;

  if (
    category?.length !== 0 ||
    (sortBy?.length === 0 && direction?.length === 0)
  ) {
    const isMultiple = category?.split(",").length > 1;
    filterByCategories = isMultiple ? category?.split(",") : category;
    // filtering by category
    query = ProductModel.find({
      category: filterByCategories,
    });
  }
  // else if (category?.length && sortBy && direction) {
  //   query = ProductModel.find().sort({
  //     [`${sortBy}`]: direction,
  //   });

  // filtering by title i.e search
  else if (product?.length && typeof product !== null) {
    query = ProductModel.find({
      title: product,
    });
  } else {
    query = ProductModel.find();
  }

  // sort logic: //title, price

  // if (sortBy && direction) {
  //   query = ProductModel.find().sort({
  //     [`${sortBy}`]: direction,
  //   });
  // }

  // build the model with the query conditionally then finally execute
  // http://localhost:3000/api/get-products?category=smartphones&sortBy=title&direction=asc
  if (category?.length && sortBy && direction) {
    query = ProductModel.find({
      category: filterByCategories,
    }).sort({
      [`${sortBy}`]: direction,
    });
  }

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
