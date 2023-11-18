// pages/api/example.js

import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const request = await req.json();

    const data = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    });

    const {
      accessToken,
      user: { firstname, email, age, id, lastname },
    } = await data.json();

    return Response.json({
      status: 200,
      statusText: "User registration successful",
      user: {
        accessToken,
        firstname,
        email,
        age,
        id,
        lastname,
      },
    });
  } catch (error) {
    return Response.json({
      error,
    });
  }
};
