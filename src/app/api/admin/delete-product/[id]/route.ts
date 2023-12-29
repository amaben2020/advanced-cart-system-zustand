import { NextResponse } from "next/server";

export const POST = (
  request: Request,
  { params }: { params: { id: string } },
) => {
  // get product id

  // delete product from db

  // return a success message

  try {
    const productId = params.id;
    console.log(productId);

    return NextResponse.json({
      message: productId,
    });
  } catch (error) {
    console.log(error);
  }
};
