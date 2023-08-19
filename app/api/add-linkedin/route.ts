import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { v4 as uuidv4 } from "uuid"

import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"
import { createSiteDB } from "@/db/site"
import { updateUserLinkedinAdded } from "@/db/user"
import Themes from "@/constants/themes"
import { ISite } from "@/app/utils/interfaces"
import { fetchPeopleLinkedinData } from "@/app/proxycurl/people"

/**
 *
 * @param request
 * @description fetches users linkedin data using proxycurl and creates site for user in the database
 * @method GET
 * @returns site data if site data was created
 */

export async function GET(request: NextRequest) {
  console.log("anything reacheed hree")
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatus.UNAUTHORIZED }
      )
    }
    const user_id: string = session.user.id

    const { searchParams } = new URL(request.url)
    const linkedinURL: string | null = searchParams.get("linkedinURL")
    const withLinkedin: boolean = searchParams.get("withLinkedin") === "true"

    if (!linkedinURL && withLinkedin)
      return NextResponse.json(
        {
          error: "linkedinURL is required",
        },
        {
          status: HttpStatus.BAD_REQUEST,
        }
      )

    const siteData: ISite | null =
      withLinkedin && linkedinURL
        ? await fetchPeopleLinkedinData(linkedinURL)
        : ({} as ISite)

    if (!siteData)
      return NextResponse.json(
        {
          error:
            "Either the URL is not valid or the API is down. Try after sometime",
        },
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }
      )
    siteData.username = uuidv4()
    siteData.userId = user_id
    const userSite = await createSiteDB(siteData, Themes.BASIC_THEMES)
    if (userSite) {
      await updateUserLinkedinAdded(true, user_id)
    }
    return NextResponse.json(userSite, { status: HttpStatus.SUCCESS })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    )
  }
}
