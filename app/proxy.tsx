import { NextResponse } from "next/server";

export function middleware(request: any) {
    const isLoggedIn = request.cookies.get("loggedInUser");
    const isGoingToHome = request.nextUrl.pathname.startsWith("/home");

    if (isGoingToHome && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home/:path*"],
};