import ProductModel, { MongooseSchemaKeys } from "@/models/product";
import dbConnect from "@/services/mongod-db";
import { TProduct } from "@/store/useProductsStore";
import { SortOrder } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../helpers/error-handler";

function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  try {
    // filtration and search logic
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const category = searchParams.get("category");
    const product = searchParams.get("product");
    const sortBy = searchParams.get("sortBy") as MongooseSchemaKeys;
    const direction = searchParams.get("direction") as SortOrder | null | any;

    const hasCategoryWithoutSort = Boolean(
      category?.length && !sortBy?.length && !direction?.length,
    );
    const hasSortWithoutCategory = Boolean(
      !category?.length && sortBy?.length && direction?.length,
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
    } else if (hasSortWithoutCategory) {
      query = ProductModel.find().sort({
        [`${sortBy}`]: direction?.toLowerCase(),
      });
    }

    // filtering by title i.e search
    else if (product?.length) {
      const regex = new RegExp(escapeRegex(product!), "gi");

      query = ProductModel.find({
        title: regex,
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
