import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { IEducation, ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { parseDateString } from "@/app/utils/functions"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

/**
 * @param req
 * @method PUT
 * @description updates education data in user's site
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

  // validate profile data
  for (let edu of payload as any[]) {
    if (!edu.school || edu.school.length === 0)
      return NextResponse.json(
        { error: "School is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!edu.field_of_study || edu.field_of_study.length === 0)
      return NextResponse.json(
        { error: "Field of study is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!edu.degree_name || edu.degree_name.length === 0)
      return NextResponse.json(
        { error: "Degree name is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!parseDateString(edu.starts_at))
      return NextResponse.json(
        { error: "Invalid start date" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!parseDateString(edu.ends_at))
      return NextResponse.json(
        { error: "Invalid end date" },
        { status: HttpStatus.BAD_REQUEST }
      )
  }

  // update site data
  const education: IEducation[] = (payload as any[]).map((edu) => {
    return {
      school: edu.school,
      field_of_study: edu.field_of_study,
      degree_name: edu.degree_name,
      starts_at: parseDateString(edu.starts_at),
      ends_at: parseDateString(edu.ends_at),
    } as IEducation
  })
  const siteData: ISite = { education }
  const updatedSite = await updateSiteDB(siteData, userId)
  revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
