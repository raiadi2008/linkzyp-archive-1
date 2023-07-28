import { NextRequest, NextResponse } from "next/server"

import HttpStatus from "./constants/http_status"
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

export async function middleware(req: NextRequest) {
  const { origin, host, pathname } = req.nextUrl
  const not_found_url = new URL("/404", origin)
  if (pathname !== "/") {
    const username = pathname.split("/")[1]
    const response = await fetch(
      new URL(`/api/portfolio-url?username=${username}`, origin)
    )
    const data = await response.json()
    console.log("data = ", response.status, data)
    if (!response.ok || response.status !== HttpStatus.SUCCESS) {
      return NextResponse.rewrite(not_found_url)
    }

    const url = data["themeUrl"]
    console.log("url", url)
    const siteURL = new URL(url)
    return NextResponse.rewrite(siteURL)
  }
}
