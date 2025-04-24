import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/with-auth";

export function mainMiddleware(request: NextRequest) {

  if (request.nextUrl.pathname.endsWith("/reviews")) {
    const redirect = "/professors/" + request.nextUrl.pathname.split("/")[2] + "#review-section";

    return NextResponse.redirect(new URL(redirect, request.url));
  }

  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/dashboard", new RegExp("^/professors/[^/]+/review$")])

