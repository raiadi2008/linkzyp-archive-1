import uploadImage from "@/app/imagekit/upload"
import fetchCompanyLogo from "@/app/proxycurl/company"
import { saveCompanyLogoDB } from "@/db/company_logo"
import { url } from "inspector"

/**
 * @param companyURL
 * @description fetches logo from proxycurl and uploads it to imagekit and saves it to database
 * @returns logo url if any else return null
 */
export default async function fetchLogo(
  companyURL: string
): Promise<string | null> {
  const parsedCompanyUrl = new URL(companyURL).toString()
  const temp_CDN_URL: string | null = await fetchCompanyLogo(parsedCompanyUrl)
  if (!temp_CDN_URL) return null
  const imagekitURL = await uploadImage(temp_CDN_URL)
  if (!imagekitURL) return null
  const parsedImagekitURL = new URL(imagekitURL.url).toString()
  const filename = imagekitURL.name
  const savedCompanyLogo = await saveCompanyLogoDB(
    parsedCompanyUrl,
    parsedImagekitURL,
    filename
  )
  return savedCompanyLogo.logo
}
