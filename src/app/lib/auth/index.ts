import { Session, SessionStrategy, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const strategy: SessionStrategy = "jwt";

type TRegisterCredentials = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
};

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  session: {
    strategy,
    maxAge: 3000,
  },

  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  // },
  providers: [
    // you simply pass in this id to the signIn and this returns a token on signIn
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          console.log(credentials);
          const user = await res.json();

          console.log(user);
          if (res.ok && user) {
            return user;
          }
        } catch (err) {
          console.log("ERROR", err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({
      token,
      user,
    }: {
      token: JWT;
      user?: User | AdapterUser | undefined;
    }) => {
      if (token && user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user = token.user as User;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
export default authOptions;
