import { unstable_getServerSession } from "next-auth";

import "./globals.css";
import authOptions from "./lib/auth";
import NextAuthSessionProvider from "./providers/session-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(authOptions);

  console.log(session);
  return (
    <html lang="en">
      <title> Product App </title>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <NextAuthSessionProvider session={session}>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
