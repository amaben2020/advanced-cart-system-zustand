import ProductModel from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { TProduct } from "@/store/useProductsStore";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../helpers/error-handler";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  // sort logic: //title, price

  // build the model with the query conditionally then finally execute
  // http://localhost:3000/api/get-products?category=smartphones&sortBy=title&direction=asc
  // if (category?.length && sortBy?.length && direction?.length) {
  //   query = ProductModel.find({
  //     category: filterByCategories,
  //   }).sort({
  //     sortBy: direction?.toLowerCase(),
  //   });
  // }

  try {
    // filtration and search logic
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const category = searchParams.get("category");
    const product = searchParams.get("product");
    const sortBy = searchParams.get("sortBy");
    const direction = searchParams.get("direction");

    const hasCategoryWithoutSort = Boolean(
      category?.length && !sortBy?.length && !direction?.length,
    );
    const hasCategoryWithSort = Boolean(
      category?.length && sortBy?.length && direction?.length,
    );

    let query;
    let filterByCategories;
    const isMultiple = category?.split(",").length! > 1;
    filterByCategories = isMultiple ? category?.split(",") : category;
    if (hasCategoryWithoutSort) {
      // filtering by category
      query = ProductModel.find({
        category: filterByCategories,
      });
    } else if (hasCategoryWithSort) {
      query = ProductModel.find({
        category: filterByCategories,
      }).sort({
        [`${sortBy}`]: direction?.toLowerCase(),
      });
    }
    // filtering by title i.e search
    else if (product?.length) {
      query = ProductModel.find({
        title: product,
      });
    } else {
      query = ProductModel.find();
    }

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
    console.log("ERROR", error);

    if (error instanceof Error) {
      if (String(error).includes("TypeError")) {
        return NextResponse.json(
          {
            message: String(error),
          },
          {
            status: 401,
            statusText: String(error),
          },
        );
      }
    }

    return ErrorHandler("Something went wrong", 500);
  }
};
