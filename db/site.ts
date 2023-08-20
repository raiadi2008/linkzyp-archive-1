import Themes from "@/constants/themes"
import { prisma } from "@/lib/prismadb"
import { ISite } from "@/app/utils/interfaces"
import { v4 as uuidv4 } from "uuid"
import { getThemeByName } from "./theme"

/**
 * @param siteData
 * @param themeName optional
 * @returns site created in database
 * @description creates a site in database with the given site data and returns the same
 */

export async function createSiteDB(
  siteData: ISite,
  themeName: string = Themes.BASIC_THEMES
) {
  const theme = await getThemeByName(themeName)
  const user_site = await prisma.site.create({
    data: {
      profile_picture: siteData.profile_picture,
      linkedin_url: siteData.linkedin_url,
      first_name: siteData.first_name,
      last_name: siteData.last_name,
      occupation: siteData.occupation,
      experiences: siteData.experiences,
      education: siteData.education,
      courses: siteData.courses,
      skills: siteData.skills,
      projects: siteData.projects,
      certificates: siteData.certificates,
      themeId: theme?.id!,
      username: siteData.username!,
      user: {
        connect: {
          id: siteData.userId,
        },
      },
    },
  })
  return user_site
}

/**
 * @param username
 * @returns site of given username
 * @description gets the site of given username from database
 */
export async function getSiteByUsernameDB(username: string) {
  const site = await prisma.site.findFirst({
    where: {
      username: username,
    },
  })
  return site
}

/**
 * @param user_id
 * @returns site of given user_id
 * @description gets the site of given user_id from database
 */
export async function getSiteByUserId(user_id: string) {
  const site = await prisma.site.findUnique({
    where: {
      userId: user_id,
    },
  })

  return site
}

/**
 * @param siteData
 * @param user_id
 * @returns updated site data
 * @description updates site of data for given user_id
 */
export async function updateSiteDB(siteData: ISite, user_id: string) {
  const updatedSite = await prisma.site.update({
    where: {
      userId: user_id,
    },
    data: {
      ...siteData,
    },
  })

  return updatedSite
}

/**
 * @param domain
 * @returns site with which domain is associated
 * @description gets the site with which domain is associated from database
 */
export async function getSiteByDomainDB(domain: string) {
  const site = await prisma.site.findFirst({
    where: {
      domain: domain,
    },
  })

  return site
}
