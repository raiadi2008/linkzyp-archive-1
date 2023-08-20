import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

/**
 * @param req
 * @method PUT
 * @description updates profile data which includes
 *      1. first name
 *      2. last name
 *      3. username
 *      4. occupation
 * @returns updated site data
 */

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const userId: string = session.user.id
  const payload = await req.json()
  const { first_name, last_name, username, occupation } = payload

  // validate profile data
  if (!first_name || first_name.length === 0) {
    return NextResponse.json(
      { error: "First name is required" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }
  if (!last_name || last_name.length === 0) {
    return NextResponse.json(
      { error: "Last name is required" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }
  if (!username || username.length === 0) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }
  if (!occupation || occupation.length === 0) {
    return NextResponse.json(
      { error: "Occupation is required" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }

  // update site data
  const siteData: ISite = {
    first_name,
    last_name,
    username,
    occupation,
  }

  const updatedSite = await updateSiteDB(siteData, userId)
  revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
