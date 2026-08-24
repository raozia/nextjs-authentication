import { NextResponse } from "next/server";

export default function proxy(request: any) {
    const isLoggedIn = request.cookies.get("loggedInUser");
    const pathname = request.nextUrl.pathname;

    const publicRoutes = ["/login", "/signup"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Not logged in → only login/signup are allowed
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Already logged in → don't allow login/signup
    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(
            new URL("/home", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};