import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const chefToken = request.cookies.get("chef_token");

  console.log(`[Middleware] ${new Date().toISOString()} — ${pathname}`);

  if (!chefToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
