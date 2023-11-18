"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setUserInfo((p) => ({
      ...p,
      [name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: "http://localhost:3000",
        redirect: true,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-20">
      <h3 className="mb-4"> Login </h3>

      <form onSubmit={handleSubmit} className="flex flex-col p-20 border">
        <input
          onChange={handleChange}
          className="p-3 my-4 text-black border-2 rounded-md"
          type="email"
          name="email"
        />
        <input
          onChange={handleChange}
          className="p-3 my-4 text-black border-2 rounded-md"
          type="password"
          name="password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
