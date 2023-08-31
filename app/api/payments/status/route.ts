import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"
import HttpStatus from "@/constants/http_status"
import { getUsersStripeIdDB } from "@/db/payments"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const usersStripe = await getUsersStripeIdDB(session.user.id)

  return NextResponse.json(
    {
      subscription_status: usersStripe
        ? usersStripe.subscription_active
        : false,
    },
    { status: HttpStatus.SUCCESS }
  )
}
