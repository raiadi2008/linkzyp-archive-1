import ThemesID from "@/constants/themes"
import { prisma } from "@/lib/prismadb"
import { ISite } from "@/types/interfaces"
import { v4 as uuidv4 } from "uuid"
import { getThemeByName } from "./theme"

export async function createSiteDB(
  siteData: ISite,
  themeName: string = ThemesID.BASIC_THEMES
) {
  const theme = await getThemeByName(themeName)
  const user_site = await prisma.site.create({
    data: {
      profile_picture: siteData.profile_picture,
      linkedin_url: siteData.linkedin_url,
      first_name: siteData.first_name,
      last_name: siteData.last_name,
      full_name: siteData.full_name,
      occupation: siteData.occupation,
      summuary: siteData.summary,
      country: siteData.country,
      experiences: siteData.experiences,
      education: siteData.education,
      courses: siteData.courses,
      skills: siteData.skills,
      projects: siteData.projects,
      certificates: siteData.certificates,
      themeId: theme?.id!,
      username: uuidv4(),
      user: {
        connect: {
          id: siteData.userId,
        },
      },
    },
  })
  return user_site
}

export async function getSiteByUsernameDB(username: string) {
  const site = await prisma.site.findFirst({
    where: {
      username: username,
    },
  })
  return site
}

export async function getSiteByUserId(user_id: string) {
  const site = await prisma.site.findUnique({
    where: {
      userId: user_id,
    },
  })

  return site
}
