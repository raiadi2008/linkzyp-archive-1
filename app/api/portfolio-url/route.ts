import HttpStatus from "@/constants/http_status"
import { getSiteByDomainDB, getSiteByUsernameDB } from "@/db/site"
import { getThemeByIdDB } from "@/db/theme"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // extract params and origin from request
  const { searchParams, origin } = new URL(req.url)

  // find username in search params
  const username: string | null = searchParams.get("username")
  const domain: string | null = searchParams.get("domain")

  if (!username && !domain)
    return NextResponse.json(
      {
        error: "Eiter domain or username is required",
      },
      {
        status: HttpStatus.BAD_REQUEST,
      }
    )
  // extract site and theme from db
  const site = username
    ? await getSiteByUsernameDB(username)
    : await getSiteByDomainDB(domain!)

  if (!site) {
    return NextResponse.json(
      { error: "Site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  }
  const themeId = site.themeId
  const theme = await getThemeByIdDB(themeId)
  if (!theme) {
    return NextResponse.json(
      { error: "Theme not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  }
  const themeUrl = new URL(`themes/${theme.path}/${site.username}`, origin)

  return NextResponse.json(
    {
      themeUrl: themeUrl.toString(),
    },
    { status: HttpStatus.SUCCESS }
  )
}
