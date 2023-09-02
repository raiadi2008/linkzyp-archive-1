import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import stripe, { createOrRetrieveStripeCustomer } from "../init/stripe"
import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"
import { getUsersStripeIdDB } from "@/db/payments"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const userStripeId = await createOrRetrieveStripeCustomer(session.user.id)
  const userStripe = await getUsersStripeIdDB(session.user.id)
  if (userStripe?.subscription_active)
    return NextResponse.json(
      { error: "You already have an active subscription" },
      { status: HttpStatus.CONFLICT }
    )

  const prices = await stripe.prices.list({
    expand: ["data.product"],
  })
  try {
    const stripeSession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      currency: "usd",
      customer: userStripeId,
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/payments/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/payments/cancelled?canceled=true`,
    })

    if (!stripeSession.url)
      return NextResponse.json(
        { error: "Invalid stripeSession" },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      )

    return new Response(JSON.stringify({ checkout_url: stripeSession.url }), {
      status: HttpStatus.SUCCESS,
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error Occured" }),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    )
  }
}
