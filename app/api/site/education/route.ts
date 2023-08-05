import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { IEducation, ISite } from "@/utils/interfaces"
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
  const payloadEducation = payload.education as IEducation[]

  const educationData = {
    experiences: payloadEducation.map((education) => {
      if (education.school && education.degree_name) {
        return education
      }
    }),
  } as ISite

  const updatedSite = await updateSiteDB(educationData, userId)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
