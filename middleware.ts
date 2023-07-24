import { NextRequest, NextResponse } from "next/server"
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|app).*)",
  ],
}

export function middleware(req: NextRequest) {
  const { origin, host, pathname } = req.nextUrl
  if (pathname != "/") {
  }
}
