import { getSiteByUserId } from "@/db/site"

export async function deleteDomain(user_id: string) {
  const site = await getSiteByUserId(user_id)
  if (!site) return
  const headers = {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
  }
  const domainDeleteUrl = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.domain}?teamId=${process.env.VERCEL_TEAM_ID}`
  const subDomainDeleteUrl = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.www_sub_domain}?teamId=${process.env.VERCEL_TEAM_ID}`

  const a = await fetch(domainDeleteUrl, {
    headers,
    method: "DELETE",
  })
  const b = await fetch(subDomainDeleteUrl, {
    headers,
    method: "DELETE",
  })

  console.log(a)
  console.log(b)

  return
}
