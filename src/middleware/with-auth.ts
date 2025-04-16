import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname

    if (requireAuth.some((path) => pathName.startsWith(path))) {
      const token = req.cookies.get("next-auth.session-token")?.value

      if (!token) {
        return NextResponse.redirect(new URL("/?authDialog=signin", req.url))
      }
    }

    return middleware(req, next)
  }
}