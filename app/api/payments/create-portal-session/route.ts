import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import stripe, { createOrRetrieveStripeCustomer } from "../init/stripe"
import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const usersStripeId = await createOrRetrieveStripeCustomer(session.user.id)
  if (!usersStripeId)
    return NextResponse.json(
      { error: "Invalid stripe id" },
      { status: HttpStatus.BAD_REQUEST }
    )
  const { url } = await stripe.billingPortal.sessions.create({
    customer: usersStripeId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/settings`,
  })
  return new Response(JSON.stringify({ url }), {
    status: 200,
  })
}
