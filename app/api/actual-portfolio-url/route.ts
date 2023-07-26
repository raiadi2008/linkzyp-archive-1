import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"
import { getSiteByUserId } from "@/db/site"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  }

  // extract user id from session
  const user_id: string = session.user.id

  const site = await getSiteByUserId(user_id)

  if (!site) {
    return NextResponse.json(
      { error: "Site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  }

  const portfolio_url = `${process.env.NEXTAUTH_URL}/${site.username}`

  return NextResponse.json(
    {
      portfolio_url,
    },
    { status: HttpStatus.SUCCESS }
  )
}
