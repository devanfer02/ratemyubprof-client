import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname

    if (requireAuth.some((path) => pathName.startsWith(path))) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET || "secret",
      });

      console.log(token)

      if (!token) {
        const url = new URL("/?authDialog=signin", req.url)
        url.searchParams.set("callbackUrl", pathName)
        return NextResponse.redirect(url)
      }
    }

    return middleware(req, next)
  }
}