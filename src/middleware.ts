import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const userId = getCookie("userId", { req });

  if (url.pathname === "/blogs") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.pathname === "/my-profile") {
    if (!userId) {
      return NextResponse.redirect(new URL("/create-user", req.url));
    }
  }

  if (url.pathname === "/create-user") {
    if (userId) {
      return NextResponse.redirect(new URL("/my-profile", req.url));
    }
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: "/blogs",
// };
