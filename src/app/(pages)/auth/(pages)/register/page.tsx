import { redirect } from "next/navigation";

const Register = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const lastName = formData.get("lastName");
    const firstName = formData.get("firstName");
    const password = formData.get("password");

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
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (
        data.status === 200 &&
        data.statusText === "User registration successful"
      ) {
        redirect("/auth/login");
      }
    }
  };
  return (
    <div>
      Register {process?.env?.VERCEL}
      <form action={handleSubmit} className="flex flex-col p-20 border">
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
