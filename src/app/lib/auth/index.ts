import { Session, SessionStrategy, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const strategy: SessionStrategy = "jwt";

type TRegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const authOptions = {
  site: process.env.NEXT_PUBLIC_URL!,
  session: {
    strategy,
    maxAge: 3000 * 10000,
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    // you simply pass in this id to the signIn and this returns a token on signIn
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // leave empty if using custom ui
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL!}/api/signin`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );

          const user = await res.json();

          console.log("USER", user);

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
      //@ts-ignore
      session.user = token.user?.user as User;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
export default authOptions;
