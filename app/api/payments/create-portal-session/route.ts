import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import stripe, { createOrRetrieveStripeCustomer } from "../init/stripe"
import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatus.UNAUTHORIZED }
      )
    const usersStripeId = await createOrRetrieveStripeCustomer(session.user.id)
    console.log(usersStripeId)
    if (!usersStripeId)
      return NextResponse.json(
        { error: "Invalid stripe id" },
        { status: HttpStatus.BAD_REQUEST }
      )
    const data = await stripe.billingPortal.sessions.create({
      customer: usersStripeId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/settings`,
    })
    console.log(data)
    return new Response(JSON.stringify({ url: data.url }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    })
  }
}
