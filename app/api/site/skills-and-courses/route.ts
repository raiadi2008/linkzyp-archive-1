import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ISite } from "@/utils/interfaces"
import { updateSiteDB } from "@/db/site"

/**
 * @param request
 * @description updates work experience in users site
 * @returns updated site data
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
  const payloadSkills = payload.skills as string[]
  const payloadCourses = payload.courses as string[]

  const skillsAndCourses = {
    skills: payloadSkills,
    courses: payloadCourses,
  } as ISite

  const updatedSite = await updateSiteDB(skillsAndCourses, userId)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
