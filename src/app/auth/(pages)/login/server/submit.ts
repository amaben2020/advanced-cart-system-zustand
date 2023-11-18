"use server";

import { signIn } from "next-auth/react";

export const handleSubmit = async (formData: FormData) => {
  try {
    const data = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "http://localhost:3000",
      redirect: true,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
