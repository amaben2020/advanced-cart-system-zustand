import authOptions from "@/app/lib/auth";
import Table from "@/components/elements/table";
import ProfileTemplate from "@/components/template/profile";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  const {
    //@ts-ignore
    user: { user },
  } = await getServerSession(authOptions);
  return (
    <div>
      <ProfileTemplate profile={user}>
        <h1 className="pt-5">Profile</h1>

        <Table
          heading={["First name", "Last name", "Role", "Email"]}
          type="profile"
          body={user}
        />
      </ProfileTemplate>
    </div>
  );
};

export default ProfilePage;
