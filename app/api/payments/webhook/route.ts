import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import stripe from "../init/stripe"
import { updateUsersSubscriptionStatusDB } from "@/db/payments"
import HttpStatus from "@/constants/http_status"

const relevantEvents = new Set([
  "customer.subscription.deleted",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.subscription.paused",
  "invoice.finalization_failed",
])

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req?.headers?.get("stripe-signature")

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    if (!sig || !webhookSecret)
      return NextResponse.json(
        { error: "Sig or webhook not present" },
        { status: HttpStatus.BAD_REQUEST }
      )
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    const subscription = event.data.object as Stripe.Subscription

    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case "invoice.paid":
          try {
            await updateUsersSubscriptionStatusDB(
              subscription.customer as string,
              true
            )
          } catch (e) {}
          break
        // case "customer.subscription.deleted":
        // case "customer.subscription.paused":
        // case "invoice.payment_failed":
        // case "invoice.finalization_failed":
        //   await updateUsersSubscriptionStatusDB(
        //     subscription.customer as string,
        //     false
        //   )
        //   break
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Webhook handler failed. View your nextjs function logs." },
      {
        status: HttpStatus.BAD_REQUEST,
      }
    )
  }

  return NextResponse.json({ recieved: true }, { status: HttpStatus.SUCCESS })
}
