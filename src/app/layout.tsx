import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NextAuthSessionProvider from "./providers/session-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title> Cartstand Ecommerce App </title>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <NextAuthSessionProvider>
          {" "}
          <ToastContainer position="top-center" />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
