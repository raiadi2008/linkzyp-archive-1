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

  const { lookup_key } = await req.json()
  const userStripeId = await createOrRetrieveStripeCustomer(session.user.id)
  if (!lookup_key)
    return NextResponse.json(
      { error: "Lookup key is required" },
      { status: HttpStatus.BAD_REQUEST }
    )

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ["data.product"],
  })
  const stripeSession = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer: userStripeId,
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/pyament/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/payment/canceled?canceled=true`,
  })

  if (!stripeSession.url)
    return NextResponse.json(
      { error: "Invalid stripeSession" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )

  return new Response(JSON.stringify({ url: stripeSession.url }), {
    status: 200,
  })
}
