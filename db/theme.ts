import { prisma } from "@/lib/prismadb"

export async function getThemeByIdDB(id: string) {
  const theme = await prisma.theme.findUnique({
    where: {
      id,
    },
  })
  return theme
}
