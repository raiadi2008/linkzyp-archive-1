import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { getSiteByUserId, getSiteByUsernameDB, updateSiteDB } from "@/db/site"

import { NextRequest, NextResponse } from "next/server"
import { ISite } from "@/utils/interfaces"

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
  const user_id = session.user.id

  const payload = (await req.json()) as ISite
  const payloadActual = {
    domain: payload.domain,
    username: payload.username,
    themeId: payload.themeId,
    profile_picture: payload.profile_picture,
    linkedin_url: payload.linkedin_url,
    first_name: payload.first_name,
    last_name: payload.last_name,
    occupation: payload.occupation,
    experiences: payload.experiences,
    education: payload.education,
    courses: payload.courses,
    skills: payload.skills,
    projects: payload.projects,
    certificates: payload.certificates,
  } as ISite
  const updatedSite = await updateSiteDB(payloadActual, user_id)

  if (!updatedSite)
    return NextResponse.json(
      { error: "Something went wrong while updating your data" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
