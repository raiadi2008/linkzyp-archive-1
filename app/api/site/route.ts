import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { getSiteByUserId, getSiteByUsernameDB, updateSiteDB } from "@/db/site"

import { NextRequest, NextResponse } from "next/server"
import { ISite } from "@/app/utils/interfaces"

/**
 * @method GET
 * @param req
 * @author Aditya Narayan Rai
 * @description Finds site associated with a user
 * @returns Site
 */

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const username: string | null = searchParams.get("username")
  let searchBy: string | null
  if (session) searchBy = session.user.id
  else if (username) searchBy = username
  else
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const site = session
    ? await getSiteByUserId(searchBy)
    : await getSiteByUsernameDB(searchBy)
  if (!site)
    return NextResponse.json(
      { error: "Site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  return NextResponse.json(site, { status: HttpStatus.SUCCESS })
}
