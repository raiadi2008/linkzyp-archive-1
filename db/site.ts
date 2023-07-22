import { prisma } from "@/lib/prismadb"
import { ISite } from "@/types/interfaces"

export async function createSiteDB(siteData: ISite) {
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
      user: {
        connect: {
          id: siteData.userId,
        },
      },
    },
  })
}
