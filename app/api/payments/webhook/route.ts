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

        case "customer.subscription.deleted":
        case "invoice.paid":
        case "invoice.payment_failed":
        case "customer.subscription.paused":
          await updateUsersSubscriptionStatusDB(
            subscription.customer as string,
            false
          )
      }
    }
  } catch (error) {
    console.log(error)
    return new Response(
      "Webhook handler failed. View your nextjs function logs.",
      {
        status: 400,
      }
    )
  }

  return new Response(JSON.stringify({ received: true }))
}
