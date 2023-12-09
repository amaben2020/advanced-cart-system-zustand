import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const userTypes = ["admin", "user"];
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const session = await getServerSession();

    //@ts-ignore
    if (session?.user?.user?.email) {
      redirect("/");
    }

    const email = formData.get("email");
    const lastName = formData.get("lastName");
    const firstName = formData.get("firstName");
    const password = formData.get("password");
    const selectedRole = formData.get("role");

    if (email && password) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL!}/api/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            role: selectedRole,
          }),
        },
      );

      const data = await response.json();

      // if (data?.message?.includes("already")) {
      //   toast.warning(data?.message);
      // }

      if (data?.user?.firstName.length > 0 && data?.user?.email.length > 0) {
        redirect("/auth/login");
      }
      console.log(data?.message);
    }
  };
  return (
    <div className="container">
      <form
        action={handleSubmit}
        className="flex flex-col px-5 py-2 border md:py-5 md:px-10 gap-y-3"
      >
        <h1 className="text-center">Register</h1>
        <input
          className="p-3 my-4 text-black border-2 rounded-md"
          type="text"
          name="firstName"
          min={5}
          max={20}
          placeholder="First name"
        />
        <input
          className="p-3 my-4 text-black border-2 rounded-md"
          type="text"
          name="lastName"
          min={5}
          max={20}
          placeholder="Last name"
        />

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
          placeholder="Password"
        />

        <div className="flex items-center justify-between gap-x-3">
          {userTypes.map((type) => (
            <div key={type}>
              <label htmlFor="" className="mr-2">
                {type}
              </label>
              <input
                className="p-3 text-black border-2 rounded-md"
                type="radio"
                name="role" // Ensure they have the same name
                id={type}
                value={type}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="py-2 px-10 border-2 rounded-lg max-w-[150px] mx-auto"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
