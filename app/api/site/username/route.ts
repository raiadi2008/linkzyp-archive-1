import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { getSiteByUsernameDB } from "@/db/site"

/**
 * @param req
 * @method GET
 * @description checks if username is available or not
 * @returns boolean
 *  1. True if username is available
 *  2. False if username is not available
 */

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")
  if (!username)
    return NextResponse.json(
      { error: "username is required" },
      { status: HttpStatus.BAD_REQUEST }
    )

  const site = await getSiteByUsernameDB(username)
  console.log(site)

  return NextResponse.json({ available: !site }, { status: HttpStatus.SUCCESS })
}
