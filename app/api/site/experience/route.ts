import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { IExperience, ISite } from "@/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { parseDateString } from "@/utils/functions"

/**
 * @param req
 * @method PUT
 * @description updates work experience data for users site
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
  for (let exp of payload as any[]) {
    if (!exp.company || exp.company.length === 0)
      return NextResponse.json(
        { error: "Company name is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!exp.title || exp.title.length === 0) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    }
    if (!parseDateString(exp.starts_at))
      return NextResponse.json(
        { error: "Start date is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    if (!exp.currently_working && !parseDateString(exp.ends_at))
      return NextResponse.json(
        { error: "End date is required if not working currently" },
        { status: HttpStatus.BAD_REQUEST }
      )
  }

  // update site data
  const experiences: IExperience[] = (payload as any[]).map((value) => {
    return {
      company: value.company,
      title: value.title,
      starts_at: parseDateString(value.starts_at),
      ends_at: value.currently_working ? null : parseDateString(value.ends_at),
      currently_working: value.currently_working,
      company_linkedin_profile_url: value.company_linkedin_profile_url,
      description: value.description,
      location: value.location,
      logo: value.logo,
    } as IExperience
  })
  const siteData: ISite = { experiences }

  const updatedSite = await updateSiteDB(siteData, userId)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
