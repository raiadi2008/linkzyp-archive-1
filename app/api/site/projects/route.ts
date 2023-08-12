import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { IEducation, IProject, ISite } from "@/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { parseDateString } from "@/utils/functions"

/**
 * @param req
 * @method PUT
 * @description updates projects data for users site
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
  for (let project of payload as any[]) {
    if (!project.title || project.title.length === 0)
      return NextResponse.json(
        { error: "Title is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
  }

  // update site data
  const projects: IProject[] = (payload as any[]).map((project) => {
    return {
      title: project.title,
      description: project.description,
      url: project.url,
    }
  })
  const siteData: ISite = { projects }

  const updatedSite = await updateSiteDB(siteData, userId)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
