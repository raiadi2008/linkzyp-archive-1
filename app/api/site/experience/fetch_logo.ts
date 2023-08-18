import uploadImage from "@/app/imagekit/upload"
import fetchCompanyLogo from "@/app/proxycurl/company"
import {
  getCompanyLogoDB,
  saveCompanyLogoDB,
  updateCompanyLogoDB,
} from "@/db/company_logo"

/**
 * @param companyURL
 * @description fetches logo from proxycurl and uploads it to imagekit and saves it to database
 * @returns logo url if any else return null
 */
export default async function fetchLogo(
  companyURL: string
): Promise<string | null> {
  const parsedCompanyUrl = new URL(companyURL)
  const baseCompanyUrl = new URL(
    parsedCompanyUrl.pathname,
    parsedCompanyUrl.origin
  ).toString()
  const temp_CDN_URL: string | null = await fetchCompanyLogo(baseCompanyUrl)
  if (!temp_CDN_URL) return null
  const dbCompanyLogo = await getCompanyLogoDB(baseCompanyUrl)
  const imagekitURL = dbCompanyLogo
    ? await uploadImage(temp_CDN_URL, false, dbCompanyLogo.file_name)
    : await uploadImage(temp_CDN_URL)
  if (!imagekitURL) return null
  const parsedImagekitURL = new URL(imagekitURL.url).toString()
  const filename = imagekitURL.name
  const savedCompanyLogo = dbCompanyLogo
    ? await updateCompanyLogoDB(parsedImagekitURL, dbCompanyLogo.id)
    : await saveCompanyLogoDB(baseCompanyUrl, parsedImagekitURL, filename)
  return savedCompanyLogo.logo
}
