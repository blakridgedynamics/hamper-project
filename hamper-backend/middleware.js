import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";

const allowedOrigins = ["http://localhost:8000", "http://localhost:8080"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the request origin
  const origin = request.headers.get("origin");
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Attach CORS headers to every API response
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔒 Protect admin-only API paths
  const isProtected =
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/messages");

  if (isProtected) {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401, headers: response.headers }
      );
    }
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};