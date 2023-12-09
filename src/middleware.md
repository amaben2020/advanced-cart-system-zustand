[](https://medium.com/@abdullahmufti/nextjs-middleware-route-protection-with-multiple-roles-using-serverside-authentication-cb3457ff5b41)

import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TypeUser } from "./app/api/auth/[...nextauth]/options";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
const { pathname }: { pathname: string } = request.nextUrl;
const token = await getToken({ req: request });
const user: TypeUser | null = token?.user as TypeUser;

const Redirect = () => {
if (user.account_type == "Admin") {
return NextResponse.redirect(new URL("/admin/Dashboard", request.url));
} else if (user.account_type == "Teacher") {
return NextResponse.redirect(new URL("/teacher/Dashboard", request.url));
} else if (user.account_type == "Student") {
return NextResponse.redirect(new URL("/student/Dashboard", request.url));
} else {
return NextResponse.redirect(
new URL(
"/login?error=Please login first to access this route",
request.url,
),
);
}
};
const authRoutes = ["/login", "/register", "/forgot-password"];

if (!!token && authRoutes.includes(pathname)) {
return Redirect();
}
if (
(!!token &&
pathname.startsWith("/admin") &&
user.account_type !== "Admin") ||
(!!token &&
pathname.startsWith("/teacher") &&
user.account_type !== "Teacher") ||
(!!token &&
pathname.startsWith("/student") &&
user.account_type !== "Student")
) {
return Redirect();
}

if (!token) {
if (
pathname.includes("/api/admin") ||
pathname.includes("/api/student") ||
pathname.includes("/api/teacher")
) {
return Response.json(
{ success: false, message: "authentication failed" },
{ status: 401 },
);
}
} else {
if (
(pathname.startsWith("/api/admin") && user.account_type !== "Admin") ||
(pathname.startsWith("/api/teacher") &&
user.account_type !== "Teacher") ||
(pathname.startsWith("/api/student") && user.account_type !== "Student")
) {
console.log(pathname, user.account_type);
return Response.json(
{ success: false, message: "authentication failed" },
{ status: 401 },
);
}
}
}

export const config = {
matcher: [
"/login",
"/register",
"/forgot-password",
"/admin/:path*",
"/teacher/:path*",
"/student/:path*",
"/api/admin/:function*",
"/api/teacher/:function*",
"/api/student/:function*",
],
};

// core js methods: startsWith , includes
// 1. get the token ✅
//2. get the pathname ✅
//3. redirect to path based on role i.e admin/dashboard for admin, auth/register for users
//4. configure the matchers for unauthenticated users and api routes
//5. include catch all routes and single paths
