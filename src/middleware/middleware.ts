import { NextRequest, NextResponse } from "next/server";
import withAuth from "./with-auth";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware)