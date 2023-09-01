import { prisma } from "@/lib/prismadb"

export async function getUsersStripeIdDB(userId: string) {
  const userStripe = await prisma.userPayments.findUnique({
    where: {
      userId,
    },
  })
  return userStripe
}

export async function createUsersStripeDB(userId: string, stripeId: string) {
  const userStripe = await prisma.userPayments.create({
    data: {
      userId,
      stripe_id: stripeId,
    },
  })
  return userStripe
}

export async function updateUsersSubscriptionStatusDB(
  user_stripe_id: string,
  status: boolean
) {
  const userStripe = await prisma.userPayments.update({
    where: {
      stripe_id: user_stripe_id,
    },
    data: {
      subscription_active: status,
    },
  })
}
