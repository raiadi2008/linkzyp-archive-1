import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { getSiteByUserId, getSiteByUsernameDB } from "@/db/site"

import { NextRequest, NextResponse } from "next/server"

/**
 * @method GET
 * @param req
 * @author Aditya Narayan Rai
 * @description Finds site associated with a user
 * @returns Site
 */

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const user_id: string = session.user.id
  const site = await getSiteByUserId(user_id)
  if (!site)
    return NextResponse.json(
      { error: "Site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  return NextResponse.json(site, { status: HttpStatus.SUCCESS })
}

/**
 * @method PUT
 * @param req
 * @author Aditya Narayan Rai
 * @description Updates site associated with a user
 * @returns Site
 */

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
}
