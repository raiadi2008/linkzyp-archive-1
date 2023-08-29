import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import HttpStatus from "@/constants/http_status"
import authOptions from "@/lib/auth"
import { isDomainTopLevel, isStringValidUrl } from "@/app/utils/functions"
import { getSiteByDomainDB, getSiteByUserId, updateSiteDB } from "@/db/site"
import { ISite } from "@/app/utils/interfaces"
import { deleteDomain } from "@/app/utils/vercel"

/**
 * @param req
 * @returns domain verification data
 * @description adds custom domain to users site
 * @method POST
 */
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
  if (!isDomainTopLevel(domain))
    return NextResponse.json(
      { error: "the domain is not top level" },
      { status: HttpStatus.BAD_REQUEST }
    )

  if (domain.includes("vercel.pub"))
    return NextResponse.json(
      { error: "Cannot use vercel.pub domain" },
      { status: HttpStatus.BAD_REQUEST }
    )

  const siteWithDomain = await getSiteByDomainDB(domain)
  if (siteWithDomain)
    return NextResponse.json(
      { error: "The domain is already in use" },
      { status: HttpStatus.BAD_REQUEST }
    )

  const www_sub_domain = `www.${domain}`
  const verifications: any[] = []
  let verified = true

  const bodySubDomain = {
    name: www_sub_domain,
    gitBranch: process.env.VERCEL_GIT_BRANCH,
  }
  const bodyMainDomain = {
    name: domain,
    redirect: www_sub_domain,
    redirectStatusCode: 307,
  }
  const www_subdomain_result = await fetch(vercelDomainAddEndpoint, {
    body: JSON.stringify(bodySubDomain),
    headers: headers,
    method: "POST",
  })
  if (
    www_subdomain_result.ok &&
    www_subdomain_result.status === HttpStatus.SUCCESS
  ) {
    const data = await www_subdomain_result.json()
    verified = verified && data.verified
    if (data.verification) {
      verifications.push(...data.verification)
    }
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
  const main_domain_result = await fetch(vercelDomainAddEndpoint, {
    body: JSON.stringify(bodyMainDomain),
    headers: headers,
    method: "POST",
  })

  if (
    main_domain_result.ok &&
    main_domain_result.status === HttpStatus.SUCCESS
  ) {
    const data = await main_domain_result.json()
    verified = verified && data.verified
    if (data.verification) {
      verifications.push(...data.verification)
    }
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
  deleteDomain(userId)
  const site = await updateSiteDB(
    {
      domain: domain,
      www_sub_domain: www_sub_domain,
    } as ISite,
    userId
  )

  return NextResponse.json(
    {
      domain: site.domain,
      www_sub_domain: site.www_sub_domain,
      verification: verifications,
      verified: verified,
    },
    { status: HttpStatus.SUCCESS }
  )
}

/**
 * @param req
 * @returns site verifiation data
 * @description checks if the users site has been verified by the vercel and live
 * @method GET
 */
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

  let isVerified = false
  const verifications: any[] = []
  const headers = {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
  }

  const vercelDomainVerifyEndpoint = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.domain}?teamId=${process.env.VERCEL_TEAM_ID}`
  const vercelSubDomainVerifyEndpoint = `${process.env.VERCEL_URL}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.www_sub_domain}?teamId=${process.env.VERCEL_TEAM_ID}`
  const resultDomain = await fetch(vercelDomainVerifyEndpoint, {
    headers,
    method: "GET",
  })
  const resultSubDomain = await fetch(vercelSubDomainVerifyEndpoint, {
    headers,
    method: "GET",
  })

  if (resultDomain.ok && resultDomain.status === HttpStatus.SUCCESS) {
    const data = await resultDomain.json()
    if (data.verification) {
      verifications.push(...data.verification)
    }
    isVerified = isVerified && data.verified
  }
  if (resultSubDomain.ok && resultSubDomain.status === HttpStatus.SUCCESS) {
    const data = await resultSubDomain.json()
    if (data.verification) {
      verifications.push(...data.verification)
    }
    isVerified = isVerified && data.verified
  }

  return NextResponse.json(
    {
      domain: site.domain,
      www_sub_domain: site.www_sub_domain,
      verified: isVerified,
      verification: verifications,
    },
    { status: HttpStatus.SUCCESS }
  )
}
