import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookieKeys } from "./config/cookies.config";

export async function middleware(request: NextRequest) {
  try {
    // Get session token from cookies (if exists)
    const session = (await cookies()).get(cookieKeys.USER_TOKEN)?.value;

    // Get current path from the request
    const url = request.nextUrl.pathname;

    // Read JWT secret from environment variables
    const jwtSecret = process?.env?.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

    const secret = new TextEncoder().encode(jwtSecret);

    // If session token exists, verify the token
    if (session) {
      const payload = (await jwtVerify(session, secret)).payload;

      // Log the payload (you can remove this in production)
      console.log({ payload });
    }

    // Define public routes that should be accessible without login
    const onlyPublicRoutes = ["/register", "/login"];

    // If user is not logged in and trying to access a protected route
    if (!session && !onlyPublicRoutes.includes(url)) {
      const nextUrl = `/login?redirect_to=${url}`;
      return NextResponse.redirect(new URL(nextUrl, request.url));
    }

    // If user is already logged in and trying to access public routes (redirect them to home)
    if (session && onlyPublicRoutes.includes(url)) {
      const redirectUrl = "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // If user is authenticated and accessing a protected route, allow the request
    if (session && !onlyPublicRoutes.includes(url)) {
      return NextResponse.next(); // Must return response
    }

  } catch (error) {
    const _err: any = error; // Renamed to _err to avoid unused variable warning

    // Clear session token if verification fails or any error occurs
    (await cookies()).delete(cookieKeys.USER_TOKEN);

    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Define which routes the middleware should apply to
export const config = {
  matcher: ["/admin/:paths*", "/register/:paths*", "/login/:paths*"],
};
