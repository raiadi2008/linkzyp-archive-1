import HttpStatus from "@/constants/http_status"
import { convertJSONIntoDate } from "@/utils/functions"
import {
  ISite,
  IExperience,
  IEducation,
  IProject,
  ICertificate,
} from "@/utils/interfaces"

/**
 * @param linkedinURL string
 * @return persons linkedin data if linkedin url was correct
 * @description fetches users linkedin data using proxycurl
 */

export async function fetchPeopleLinkedinData(linkedinURL: string) {
  const proxycurlURL = `${process.env.PROXY_CURL_BASE}/api/v2/linkedin?url=${linkedinURL}&fallback_to_cache=on-error&use_cache=if-present&skills=include`

  const res = await fetch(proxycurlURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROXY_CURL_KEY}`,
    },
  })

  if (res.status === HttpStatus.SUCCESS && res.ok) {
    const data = await res.json()

    const experiences = (data["experiences"] as any[]).map((value, index) => {
      return {
        starts_at: convertJSONIntoDate(value["starts_at"]),
        ends_at: convertJSONIntoDate(value["ends_at"]),
        company: value["company"],
        company_linkedin_profile_url: value["company_linkedin_profile_url"],
        title: value["title"],
        description: value["description"],
        location: value["location"],
        logo: value["logo_url"],
      } as IExperience
    })

    const education = (data["education"] as any[]).map((value, index) => {
      return {
        starts_at: convertJSONIntoDate(value["starts_at"]),
        ends_at: convertJSONIntoDate(value["ends_at"]),
        school: value["school"],
        field_of_study: value["field_of_study"],
        degree_name: value["degree_name"],
        logo: value["logo_url"],
      } as IEducation
    })

    const projects = (data["accomplishment_projects"] as any[]).map(
      (value, index) => {
        return {
          title: value["title"],
          description: value["description"],
          url: value["url"],
        } as IProject
      }
    )

    const certificates = (data["certifications"] as any[]).map(
      (value, index) => {
        return {
          name: value["name"],
          authority: value["authority"],
          url: value["url"],
        } as ICertificate
      }
    )

    const courses = (data["courses"] as any[]).map((value, index) => {
      return value["name"]
    })

    const siteInfo = {
      profile_picture: data["profile_pic_url"],
      first_name: data["first_name"],
      last_name: data["last_name"],
      linkedin_url: linkedinURL,
      occupation: data["occupation"],
      experiences,
      education,
      projects,
      certificates,
      courses,
      skills: data["skills"],
    } as ISite
  }
  return null
}
