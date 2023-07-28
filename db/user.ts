import { prisma } from "@/lib/prismadb"

export async function updateUserLinkedinAdded(
  added_linkedin: boolean,
  user_id: string
) {
  const user = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      added_linkedin: added_linkedin,
    },
  })
  return user
}

export async function getUserByIdDB(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
}
