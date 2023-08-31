import { prisma } from "@/lib/prismadb"

export function getUsersStripeIdDB(userId: string) {
  const userStripe = prisma.userPayments.findUnique({
    where: {
      userId,
    },
  })
  return userStripe
}

export function createUsersStripeDB(userId: string, stripeId: string) {
  const userStripe = prisma.userPayments.create({
    data: {
      userId,
      stripe_id: stripeId,
    },
  })
  return userStripe
}

export function updateUsersSubscriptionStatusDB(
  user_stripe_id: string,
  status: boolean
) {
  const userStripe = prisma.userPayments.update({
    where: {
      stripe_id: user_stripe_id,
    },
    data: {
      subscription_active: status,
    },
  })
}
