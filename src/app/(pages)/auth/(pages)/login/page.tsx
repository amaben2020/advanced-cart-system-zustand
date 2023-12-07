"use client";
import EyeClosed from "@/assets/svgs/EyeClosed";
import EyeOpen from "@/assets/svgs/EyeOpen";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { handleToggle, showPassword, icon } = useTogglePasswordVisibility();

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
      if (!userInfo.email || userInfo.email.length === 0) {
        alert("You must insert email");
        return;
      }

      await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-full md:max-w-[900px] mx-auto justify-center p-3 md:p-20">
      <form onSubmit={handleSubmit} className="flex flex-col p-20 border">
        <h3 className="mb-4"> Login </h3>
        <input
          onChange={handleChange}
          className="p-3 my-4 text-black border-2 rounded-md"
          type="email"
          name="email"
          value={userInfo?.email}
          placeholder="Email"
        />

        <div className="relative">
          <input
            onChange={handleChange}
            className="w-full p-3 my-4 text-black border-2 rounded-md"
            type={showPassword ? "password" : "text"}
            name="password"
            value={userInfo?.password}
            placeholder="Password"
          />
          <span
            className="absolute z-10 cursor-pointer top-[40%] right-4"
            onClick={handleToggle}
          >
            {icon === "eye-closed" ? <EyeClosed /> : <EyeOpen />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
