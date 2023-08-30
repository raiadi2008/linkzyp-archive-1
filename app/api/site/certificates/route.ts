import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ICertificate, ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

/**
 * @param req
 * @method PUT
 * @description updates certificates data for users site
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
  for (let c of payload as any[]) {
    if (!c.name || c.name.length === 0)
      return NextResponse.json(
        { error: "Invalid certificate name" },
        { status: HttpStatus.BAD_REQUEST }
      )
  }

  // update site data
  const certificates: ICertificate[] = (payload as any[]).map((value) => {
    return {
      name: value.name,
      url: value.url,
      authority: value.authority,
    } as ICertificate
  })

  const siteData: ISite = { certificates }

  const updatedSite = await updateSiteDB(siteData, userId)
  await revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
