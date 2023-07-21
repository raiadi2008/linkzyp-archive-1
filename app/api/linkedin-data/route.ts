import HttpStatus from "@/constants/http_status"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const linkedinURL: string | null = searchParams.get("linkedinURL")
  if (!linkedinURL)
    return NextResponse.json(
      {
        error: "linkedinURL is required",
      },
      {
        status: HttpStatus.BAD_REQUEST,
      }
    )
  else {
    const res = await fetch(
      `${process.env.PROXY_CURL_BASE}/api/v2/linkedin?url=${linkedinURL}&fallback_to_cache=on-error&use_cache=if-present&skills=include`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PROXY_CURL_KEY}`,
        },
      }
    )
    if (res.ok && res.status === HttpStatus.SUCCESS) {
      return NextResponse.json(await res.json(), { status: HttpStatus.SUCCESS })
    } else {
      return NextResponse.json(
        {
          error:
            "Either the URL is not valid or the API is down. Try after sometime",
        },
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }
      )
    }
  }
}
