import { NextRequest, NextResponse } from "next/server";

// Simple demo credentials — in production, use a real auth system
const DEMO_USERNAME = "chef";
const DEMO_PASSWORD = "letmecook";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    const response = NextResponse.json({ success: true });

    // Set chef_token cookie (valid for 7 days)
    response.cookies.set("chef_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  // Clear the chef_token cookie
  response.cookies.set("chef_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
