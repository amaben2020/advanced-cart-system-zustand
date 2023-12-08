import { generateAvatar } from "@/utils/generateAvatar";
import Link from "next/link";
import { ReactNode } from "react";

const ProfileTemplate = async ({
  profile,
  children,
}: {
  profile: any;
  children: ReactNode;
}) => {
  const { text, bg, textColor } = generateAvatar(
    profile?.firstName ?? "",
    profile?.lastName ?? "",
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

      <div className="container pt-20 text-center border-2 shadow-lg rounded-b-md lg:pt-10">
        {children}
      </div>
    </section>
  );
};

export default ProfileTemplate;
