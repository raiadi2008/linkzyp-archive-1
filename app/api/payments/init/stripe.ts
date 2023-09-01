import { createUsersStripeDB, getUsersStripeIdDB } from "@/db/payments"
import { getUserByIdDB } from "@/db/user"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
})

export async function createOrRetrieveStripeCustomer(user_id: string) {
  const usersStripe = await getUsersStripeIdDB(user_id)
  if (usersStripe) return usersStripe.stripe_id

  const user = await getUserByIdDB(user_id)

  if (!user) throw Error("Invalid Id")
  const customerData: Stripe.CustomerCreateParams = {
    email: user.email!,
    name: user.name!,
    address: {
      country: "US",
      city: "New York",
      line1: "123 Main St",
      postal_code: "10001",
    },
    metadata: {
      user_id: user_id,
    },
  }

  const customer = await stripe.customers.create(customerData)
  if (!customer || !customer.id) throw Error("Error creating customer")
  await createUsersStripeDB(user_id, customer.id)
  return customer.id
}

export default stripe
