import HttpStatus from "@/constants/http_status"
import { getSiteByUsernameDB } from "@/db/site"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // extract params and origin from request
  const { searchParams, origin } = new URL(req.url)

  // find username in search params
  const username: string | null = searchParams.get("username")
  if (!username)
    return NextResponse.json(
      {
        error: "Username is required",
      },
      {
        status: HttpStatus.BAD_REQUEST,
      }
    )
  // extract site and theme from db
  const site = await getSiteByUsernameDB(username)
  if (!site) {
    return NextResponse.json(
      { error: "Site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  }
  return NextResponse.json(site, {
    status: HttpStatus.SUCCESS,
  })
}
