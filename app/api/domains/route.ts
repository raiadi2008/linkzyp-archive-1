import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"
import { isDomainTopLevel, isStringValidUrl } from "@/app/utils/functions"
import { getSiteByDomainDB, getSiteByUserId, updateSiteDB } from "@/db/site"
import { ISite } from "@/app/utils/interfaces"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )

  const vercelDomainAddEndpoint = `${process.env.VERCEL_URL}/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains?teamId=${process.env.VERCEL_TEAM_ID}`
  const headers = {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
  }

  const userId: string = session.user.id
  const payload = await req.json()
  const { domain }: { domain: string } = payload

  // validate
  if (!isStringValidUrl(domain))
    return NextResponse.json(
      { error: "the domain is not a valid url" },
      { status: HttpStatus.BAD_REQUEST }
    )

  if (domain.includes("vercel.pub"))
    return NextResponse.json(
      { error: "Cannot use vercel.pub subdomain as your custom domain" },
      { status: HttpStatus.BAD_REQUEST }
    )
  const domainHost = new URL(domain).host
  const siteWithDomain = await getSiteByDomainDB(domainHost)
  if (siteWithDomain)
    return NextResponse.json(
      { error: "The domain is already in use" },
      { status: HttpStatus.BAD_REQUEST }
    )

  const verifications: any[] = []
  if (isDomainTopLevel(domainHost)) {
    const bodyMainDomain = {
      name: `www.${domainHost}`,
      gitBranch: process.env.VERCEL_GIT_BRANCH,
    }
    const result = await fetch(vercelDomainAddEndpoint, {
      body: JSON.stringify(bodyMainDomain),
      headers: headers,
      method: "POST",
    })
    if (result.ok && result.status === HttpStatus.SUCCESS) {
      const data = await result.json()
      if (data["verification"]) verifications.push(data["verification"])
    } else {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      )
    }
  }
  const bodySubDomain = {
    name: domainHost,
    gitBranch: process.env.VERCEL_GIT_BRANCH,
    redirect: isDomainTopLevel(domainHost) ? `www.${domainHost}` : null,
    redirectStatusCode: isDomainTopLevel(domainHost) ? 307 : null,
  }
  const result = await fetch(vercelDomainAddEndpoint, {
    body: JSON.stringify(bodySubDomain),
    headers: headers,
    method: "POST",
  })

  if (result.ok && result.status === HttpStatus.SUCCESS) {
    const data = await result.json()
    if (data["verification"]) verifications.push(data["verification"])
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }

  const site = await updateSiteDB(
    {
      domain: domainHost,
      www_sub_domain: isDomainTopLevel(domainHost) ? `www.${domainHost}` : null,
    } as ISite,
    userId
  )

  return NextResponse.json(
    { domain: site.domain, verification: verifications },
    { status: HttpStatus.SUCCESS }
  )
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatus.UNAUTHORIZED }
    )
  const userId: string = session.user.id
  const site = await getSiteByUserId(userId)
  if (!site || !site.domain) {
    return NextResponse.json(
      { error: "domain or site not found" },
      { status: HttpStatus.NOT_FOUND }
    )
  }
  const host = site.domain
  let isVerified = false
  const verifications: any[] = []
  const headers = {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
  }

  // if () {
  //   const vercelDomainVerifyEndpoint = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.domain}/verify`
  // }

  // const vercelDomainVerifyEndpoint = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.www_sub_domain}/verify`
}
