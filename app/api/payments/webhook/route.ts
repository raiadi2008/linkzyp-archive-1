import { NextRequest } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import stripe from "../init/stripe"
import { updateUsersSubscriptionStatusDB } from "@/db/payments"

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
    const sig = headers().get("Stripe-Signature") as string
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event
    if (!sig || !webhookSecret) return
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    const subscription = event.data.object as Stripe.Subscription

    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case "invoice.paid":
          await updateUsersSubscriptionStatusDB(
            subscription.customer as string,
            true
          )
          return
        case "customer.subscription.deleted":
        case "customer.subscription.paused":
        case "invoice.payment_failed":
        case "invoice.finalization_failed":
          await updateUsersSubscriptionStatusDB(
            subscription.customer as string,
            false
          )
          return
      }
    }
  } catch (error) {
    return new Response(
      "Webhook handler failed. View your nextjs function logs.",
      {
        status: 400,
      }
    )
  }

  return new Response(JSON.stringify({ received: true }))
}
