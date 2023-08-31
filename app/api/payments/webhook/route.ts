import { NextRequest } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import stripe from "../init/stripe"
import { updateUsersSubscriptionStatusDB } from "@/db/payments"

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
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
      updateUsersSubscriptionStatusDB(
        subscription.customer as string,
        event.type === "customer.subscription.created" ||
          event.type === "customer.subscription.updated"
      )
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
