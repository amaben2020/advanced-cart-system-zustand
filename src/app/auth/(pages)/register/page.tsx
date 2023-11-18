import { redirect } from "next/navigation";

const Register = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const lastname = formData.get("lastName");
    const firstname = formData.get("firstName");
    const password = formData.get("password");

    if (email && password) {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const data = await response.json();

      if (data.status === 200 && data.user.accessToken) {
        redirect("/auth/login");
      }
    }
  };
  return (
    <div>
      Register
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
