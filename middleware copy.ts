import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log request
  console.log(`[Middleware] ${pathname} at ${new Date().toISOString()}`);

  // Protect /manage/* routes
  if (pathname.startsWith("/manage")) {
    const chefToken = request.cookies.get("chef_token");

    if (!chefToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("error", "login_required");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
