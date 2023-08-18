import HttpStatus from "@/constants/http_status"

export default async function fetchCompanyLogo(
  companyURL: string
): Promise<string | null> {
  const proxycurlURL = `${process.env.PROXY_CURL_BASE}/api/linkedin/company/profile-picture?linkedin_company_profile_url=${companyURL}`
  const res = await fetch(proxycurlURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROXY_CURL_KEY}`,
    },
  })
  if (!res.ok || res.status !== HttpStatus.SUCCESS) {
    return null
  }
  const data = await res.json()
  return data["tmp_profile_pic_url"]
}
