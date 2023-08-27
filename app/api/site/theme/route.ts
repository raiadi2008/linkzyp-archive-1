import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const payload = await req.json()
  const { theme_id }: { theme_id: string | null } = payload
  if (!theme_id)
    return NextResponse.json(
      { error: "theme_id is required" },
      { status: HttpStatus.BAD_REQUEST }
    )
  const siteData: ISite = {
    themeId: theme_id,
  }
  const updatedData = await updateSiteDB(siteData, session.user.id)
  revalidatePortfolioData(updatedData.username)
  return NextResponse.json(updatedData, { status: HttpStatus.SUCCESS })
}
