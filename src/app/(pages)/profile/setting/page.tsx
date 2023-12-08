import authOptions from "@/app/lib/auth";
import ProfileTemplate from "@/components/template/profile";
import { getServerSession } from "next-auth";

const SettingPage = async () => {
  const {
    //@ts-ignore
    user: { user },
  } = await getServerSession(authOptions);

  const handleEdit = (formData: FormData) => {
    const email = formData.get("email");
  };

  return (
    <div>
      <ProfileTemplate profile={user}>
        <h1 className="pt-6">Edit Profile</h1>

        <form action="" className="flex flex-col p-8">
          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="password"
            name="password"
            placeholder="password"
          />

          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="text"
            name="firstName"
            placeholder="First name"
          />
          <input
            className="p-3 my-4 text-black border-2 rounded-md"
            type="text"
            name="lastName"
            placeholder="Last name"
          />

          <button type="submit">Edit</button>
        </form>
      </ProfileTemplate>
    </div>
  );
};

export default SettingPage;
