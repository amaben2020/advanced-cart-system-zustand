"use client";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const Login = () => {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    getCsrfToken().then((res) => setCsrfToken(res));
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await signIn("login", {
      email: "ben@gmail.com",
      password: "1234",
      // firstname: "Olivsier",
      // lastname: "Mongse",
      // age: 32,
      callbackUrl: `${window.location.origin}`,
    });

    console.log(window?.location?.origin);

    console.log(response);
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="text" />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
