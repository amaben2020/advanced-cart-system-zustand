"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const NextAuthSessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return <SessionProvider>{children} </SessionProvider>;
};

export default NextAuthSessionProvider;
