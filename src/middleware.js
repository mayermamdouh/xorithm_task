import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedPages = ["/dashboard"];
    // const isAuthRoute = pathname.startsWith("/");
    const isProtectedRoute = protectedPages.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/" && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/"],
};
