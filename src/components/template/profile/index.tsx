"use client";

import useDataFetch from "@/hooks/useDataFetch";
import { generateAvatar } from "@/utils/generateAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// to use server components and enforce auto code splitting, write all use client code elsewhere and simply import in server component
const ProfileTemplate = () => {
  const session = useSession();
  const router = useRouter();
  // TODO: extract this redirect logic to a hook or something
  useEffect(() => {
    if (
      //@ts-ignore
      session?.data?.user?.user?.email === undefined &&
      session?.status === "unauthenticated"
    ) {
      router.push("/auth/login");
    }
    //@ts-ignore
  }, [router, session?.data?.user?.user?.email, session.status]);
  const { state } = useDataFetch<{
    user: Record<string, string>;
    //@ts-ignore
  }>(`/user/get-user?email=${session.data?.user?.user.email}`);

  //@ts-ignore
  if (session?.status === "authenticated" && session?.data?.user?.user) {
    const { text, bg, textColor } = generateAvatar(
      //@ts-ignore
      session.data?.user.user?.firstName ?? "",
      //@ts-ignore
      session?.data?.user.user?.lastName ?? "",
    );

    return (
      <section>
        <div className="relative p-20 bg-black">
          <div className="w-[50px]">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </Link>
          </div>

          <div
            style={{
              background: bg,
              color: textColor,
            }}
            className="absolute flex items-center justify-center w-20 h-20 transform -translate-x-1/2 border rounded-full -bottom-10 left-1/2"
          >
            <p className="justify-center inline-block my-auto text-xl font-bold text-center align-middle">
              {text}
            </p>
          </div>
        </div>

        <div className="container pt-20 text-center border-2 rounded-lg shadow-lg lg:pt-10">
          <h1 className="pt-5">Profile</h1>

          <table className="w-full mt-6 table-auto">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state?.data?.user?.firstName}</td>
                <td>{state?.data?.user?.lastName}</td>
                <td>{state?.data?.user?.role}</td>
                <td>{state?.data?.user?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};

export default ProfileTemplate;
