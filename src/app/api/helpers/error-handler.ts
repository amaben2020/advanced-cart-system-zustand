import { NextResponse } from "next/server";

export const ErrorHandler = (message: string, status: number) => {
  return NextResponse.json(
    {
      ...(status === 500
        ? {
            message: "Something went wrong on the backend",
          }
        : {
            message: "Something went wrong",
          }),
    },

    {
      status,
      statusText: message,
    },
  );
};
