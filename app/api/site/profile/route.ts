import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ISite } from "@/utils/interfaces"
import { updateSiteDB } from "@/db/site"

/**
 * @param request
 * @description updates profile informations for users which includes
 *      1. first name
 *      2. last name
 *      3. occupation
 *      4. username
 *
 * @returns updates site data after making changes
 */

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const userId: string = session.user.id
  const payload = await request.json()

  const profileData = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    occupation: payload.occupation,
    username: payload.username,
  } as ISite

  const updatedSite = await updateSiteDB(profileData, userId)

  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
