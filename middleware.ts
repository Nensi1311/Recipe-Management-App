import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /manage routes
  if (pathname.startsWith("/manage")) {
    const token = request.cookies.get("chef_token");

    // Log path and timestamp
    console.log(`[Middleware] ${new Date().toISOString()} - Path: ${pathname}`);

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "login_required");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage", "/manage/:path*"],
};
