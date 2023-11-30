import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const request = await req.json();

    const data = await fetch(`${process.env.NEXT_PUBLIC_URL!}api/signup`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    });

    const {
      accessToken,
      user: { firstName, email, lastName },
    } = await data.json();

    return Response.json({
      status: 200,
      statusText: "User registration successful",
      user: {
        accessToken,
        firstName,
        email,
        lastName,
      },
    });
  } catch (error) {
    return Response.json({
      error,
    });
  }
};
