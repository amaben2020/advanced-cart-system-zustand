import authOptions from "@/app/lib/auth";
import { generateAvatar } from "@/utils/generateAvatar";
import { getServerSession } from "next-auth";
import Link from "next/link";

const ProfileTemplate = async () => {
  const {
    //@ts-ignore
    user: { user },
  } = await getServerSession(authOptions);

  const { text, bg, textColor } = generateAvatar(
    user?.firstName ?? "",
    user?.lastName ?? "",
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
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.role}</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProfileTemplate;
