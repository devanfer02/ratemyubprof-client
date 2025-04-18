import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/with-auth";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/dashboard", new RegExp("^/professors/[^/]+/review$")])

