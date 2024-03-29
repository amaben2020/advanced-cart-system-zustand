"use client";
import EyeClosed from "@/assets/svgs/EyeClosed";
import EyeOpen from "@/assets/svgs/EyeOpen";
import { usePlunk } from "@/hooks/usePlunk";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { handleToggle, showPassword, icon } = useTogglePasswordVisibility();

  const { triggerPlunkEvt } = usePlunk({ email: userInfo.email });

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
      await triggerPlunkEvt();
      if (!userInfo.email || userInfo.email.length === 0) {
        alert("You must insert email");
        return;
      }
      toast.success(`${userInfo.email} logged in successfully`, {});
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

        {/* TODO: refactor to reuse input component */}
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

        <button
          className="py-2 px-10 border-2 rounded-lg max-w-[150px] mx-auto"
          type="submit"
        >
          Login
        </button>

        <div className="flex justify-between">
          <p>Do not have an account? </p>
          <Link href="/auth/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
