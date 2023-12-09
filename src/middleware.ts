import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  try {
    const token: any = await getToken({ req });

    const pathname = req.nextUrl.pathname;

    const userRole = token?.user?.user?.user.role;

    // if authenticated, do not view these routes
    const authenticatedRoutes = [
      "/auth/login",
      "/auth/register",
      "/forgot-password",
    ];

    const redirectBasedOnRole = (role: "user" | "admin") => {
      switch (role) {
        case "user":
          return NextResponse.redirect(new URL("/", req.url));

        case "admin":
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));

        default:
          return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    };

    // if (correctedRoutes.includes("/register")) {
    //   return NextResponse.redirect(new URL("/auth/register", req.url));
    // }

    // if no token, always redirect users to login
    if (userRole === undefined) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // authenticated users should never view this route regardless of role
    if (!!token && authenticatedRoutes.includes(pathname) && userRole) {
      return redirectBasedOnRole(userRole);
    }

    // redirect if a user accidentally lands on another route (mainly user on admin)
    if (!!token && pathname.startsWith("/admin") && userRole !== "admin") {
      return redirectBasedOnRole(userRole);
    }

    // handling api routes
    if (!token) {
      // user api route should be for all so admin should be able to view it. Use || if you wanna change this later
      if (pathname.includes("/api/admin") && userRole !== "admin") {
        return Response.json(
          { success: false, message: "User not admin, authentication failed" },
          { status: 401 },
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// these are the only paths the middleware function runs
export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/api/admin/:function*",
    "/auth/login",
    "/auth/register",
  ],
};
