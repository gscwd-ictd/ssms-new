import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "./lib/auth";

const authRoutes = ["/signin", "/signup"];
const passwordRoutes = ["/reset-password-success", "forgot-password"];

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: process.env.BETTER_AUTH_URL,
    headers: {
      // Get the cookie from the request
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!session) {
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
