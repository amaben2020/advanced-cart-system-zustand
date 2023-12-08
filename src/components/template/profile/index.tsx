"use client";

import { generateAvatar } from "@/utils/generateAvatar";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// to use server components and enforce auto code splitting, write all use client code elsewhere and simply import in server component
const ProfileTemplate = () => {
  const session = useSession();
  const router = useRouter();
  // extract this redirect logic to a hook or something
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

  if (session.status === "authenticated") {
    const { text, bg, textColor } = generateAvatar(
      //@ts-ignore
      session.data?.user.user?.firstName ?? "",
      //@ts-ignore
      session?.data?.user.user?.lastName ?? "",
    );

    return (
      <section>
        <div className="relative p-20 bg-black">
          Upper, avatar generated with initials
          <div
            style={{
              background: bg,
              color: textColor,
            }}
            className={clsx(
              text.length > 0 && `bg-[${bg}] text-[${text}]`,
              "absolute flex items-center justify-center w-20 h-20 transform -translate-x-1/2 border rounded-full -bottom-10 left-1/2",
            )}
          >
            <p className="justify-center inline-block my-auto text-xl font-bold text-center align-middle">
              {text}
            </p>
          </div>
        </div>

        <div className="container pt-20 text-center border-2 rounded-lg lg:pt-10">
          <h1 className="pt-5">Profile</h1>
        </div>
      </section>
    );
  }
};

export default ProfileTemplate;
