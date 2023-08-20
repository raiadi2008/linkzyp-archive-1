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
 * @description updates links and socials
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
  const {
    resume_link,
    linkedin_url,
    instagram_url,
    twitter_url,
    youtube_url,
    medium_url,
    github_url,
    dribbble_url,
    hire_me,
    publication,
  } = payload

  // update site data
  const siteData: ISite = {
    resume_link,
    linkedin_url,
    instagram_url,
    twitter_url,
    youtube_url,
    medium_url,
    github_url,
    dribbble_url,
    hire_me,
    publication,
  }

  const updatedSite = await updateSiteDB(siteData, userId)
  revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
