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
  const userStripeId = await createOrRetrieveStripeCustomer(session.user.id)

  const prices = await stripe.prices.list({
    expand: ["data.product"],
  })

  console.log(prices)
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/pyament/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/app/payment/canceled?canceled=true`,
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
    console.log(e)
    return new Response(
      JSON.stringify({ error: "Internal Server Error Occured" }),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    )
  }
}
