import { NextRequest, NextResponse } from "next/server"

import HttpStatus from "@/constants/http_status"
import { getAllThemesDB } from "@/db/theme"

/**
 * @param req
 * @returns list of available themes
 */
export async function GET(req: NextRequest) {
  const themes = await getAllThemesDB()
  return NextResponse.json({ themes }, { status: HttpStatus.SUCCESS })
}
