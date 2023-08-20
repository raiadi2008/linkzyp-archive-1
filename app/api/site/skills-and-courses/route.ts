import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import isValid from "./function"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

/**
 * @param req
 * @method PUT
 * @description updates skills and courses data for user's site
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
  const { skills, courses } = payload

  // validate profile data
  if (!isValid(skills)) {
    return NextResponse.json(
      { error: "Invalid skills data" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }
  if (!isValid(courses)) {
    return NextResponse.json(
      { error: "Invalid courses data" },
      { status: HttpStatus.BAD_REQUEST }
    )
  }

  // update site data
  const siteData: ISite = {
    skills: !skills ? [] : skills,
    courses: !courses ? [] : courses,
  }

  const updatedSite = await updateSiteDB(siteData, userId)
  revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
