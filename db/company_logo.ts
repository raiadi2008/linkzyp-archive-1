import { prisma } from "@/lib/prismadb"

/**
 * @param company_url string
 * @param logo_url string
 * @returns saved companyLogo in database
 */
export async function saveCompanyLogoDB(
  company_url: string,
  logo_url: string,
  name: string
) {
  const companyLogo = await prisma.companyLogo.create({
    data: {
      company: company_url,
      logo: logo_url,
      file_name: name,
    },
  })
  return companyLogo
}

/**
 * @param company_url string
 * @returns companyLogo in database based on company url
 */
export async function getCompanyLogoDB(company_url: string) {
  const companyLogo = await prisma.companyLogo.findUnique({
    where: {
      company: company_url,
    },
  })
  return companyLogo
}
/**
 * @param logo_url string
 * @param id ObjectID
 * @return updated companyLogo in database
 */
export async function updateCompanyLogoDB(logo_url: string, id: string) {
  const companyLogo = await prisma.companyLogo.update({
    data: {
      logo: logo_url,
    },
    where: {
      id: id,
    },
  })
  return companyLogo
}
