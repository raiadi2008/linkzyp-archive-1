import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { IFaq, ISite } from "@/app/utils/interfaces"
import { updateSiteDB } from "@/db/site"
import { revalidatePortfolioData } from "@/app/utils/revalidate"

/**
 * @param req
 * @method PUT
 * @description update your faq section
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
  for (let faq of payload as any[]) {
    if (!faq.question || faq.question.length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    }
    if (!faq.answer || faq.answer.length === 0) {
      return NextResponse.json(
        { error: "Answer is required" },
        { status: HttpStatus.BAD_REQUEST }
      )
    }
  }

  // update site data
  const faqs: IFaq[] = (payload as any[]).map((faq: any) => {
    return {
      question: faq.question,
      answer: faq.answer,
    }
  })
  const siteData: ISite = { faqs }

  const updatedSite = await updateSiteDB(siteData, userId)
  await revalidatePortfolioData(updatedSite.username)
  return NextResponse.json(updatedSite, { status: HttpStatus.SUCCESS })
}
