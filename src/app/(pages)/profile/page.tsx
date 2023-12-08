import authOptions from "@/app/lib/auth";
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
      </ProfileTemplate>
    </div>
  );
};

export default ProfilePage;
