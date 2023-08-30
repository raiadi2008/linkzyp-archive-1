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
  let targetURL: URL

  if (host.includes(process.env.MAIN_HOST!) || host.includes("vercel.app")) {
    if (pathname === "/" || pathname === "") {
      console.log("came here")
      return NextResponse.next()
    } else {
      const username = pathname.split("/")[1]
      targetURL = new URL(`/api/portfolio-url?username=${username}`, origin)
    }
  } else {
    targetURL = new URL(`/api/portfolio-url?domain=${host}`, origin)
  }
  const response = await fetch(targetURL)
  const data = await response.json()
  if (!response.ok || response.status !== HttpStatus.SUCCESS) {
    return NextResponse.rewrite(not_found_url)
  }
  const url = data["themeUrl"]
  console.log("url = ", url)
  const siteURL = new URL(url)
  console.log("siteURL", siteURL)
  return NextResponse.rewrite(siteURL)
}
