import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { v4 as uuidv4 } from "uuid"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { fetchPeopleLinkedinData } from "@/app/proxycurl/people"
import { ISite } from "@/utils/interfaces"
import { createSiteDB } from "@/db/site"
import Themes from "@/constants/themes"

/**
 * @param request NextRequest
 * @returns genrated site data
 * @description fetches linkedin profile data and creates site data
 *      for the user if linkedin url is provided and genrate-with-linkedin
 *      is true. If genrate-with-linkedin is false then creates a minimal
 *      site data for the user.
 */

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const userId: string = session.user.id
  const { searchParams } = new URL(request.url)
  const linkedinURL: string | null = searchParams.get("linkedin-url")
  const genrateWithLinkedin: boolean =
    searchParams.get("genrate-with-linkedin") === "true"

  if (!linkedinURL && genrateWithLinkedin)
    return NextResponse.json(
      {
        error: "linkedin url is required",
      },
      { status: HttpStatus.BAD_REQUEST }
    )

  const siteData = genrateWithLinkedin
    ? await fetchPeopleLinkedinData(linkedinURL!)
    : ({} as ISite)

  if (!siteData) {
    return NextResponse.json(
      { error: "Something went wrong. Check your profile url" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }

  const databasePayload = {
    ...siteData,
    userId: userId,
    username: uuidv4(),
  } as ISite

  const createdSite = await createSiteDB(siteData, Themes.BASIC_THEMES)
  return NextResponse.json(createdSite, { status: HttpStatus.SUCCESS })
}
