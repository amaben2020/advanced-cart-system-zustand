import authOptions from "@/app/lib/auth";
import ProfileTemplate from "@/components/template/profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SettingPage = async () => {
  const {
    //@ts-ignore
    user: { user },
  } = await getServerSession(authOptions);

  const handleEdit = async (formData: FormData) => {
    "use server";
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL!}/api/update-profile?email=${user?.email}`,
      {
        method: "POST",
        body: JSON.stringify({
          password,
          firstName,
          lastName,
        }),
      },
    );
    const info = await data.json();

    if (info.user) {
      redirect("/profile");
    }
  };

  return (
    <div>
      <ProfileTemplate profile={user}>
        <h1 className="pt-6">Edit Profile</h1>

        <form action={handleEdit} className="flex flex-col p-8">
          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="password"
            name="password"
            placeholder="Update password"
          />

          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="text"
            name="firstName"
            pattern="[A-Za-z0-9]+"
            placeholder={user.firstName}
          />
          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="text"
            name="lastName"
            pattern="[A-Za-z0-9]+"
            placeholder={user.lastName}
          />

          <button
            className="py-2 px-10 border-2 rounded-lg max-w-[150px] mx-auto"
            type="submit"
          >
            Edit
          </button>
        </form>
      </ProfileTemplate>
    </div>
  );
};

export default SettingPage;
