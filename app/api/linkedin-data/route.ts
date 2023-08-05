import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getServerSession } from "next-auth"
import { v4 as uuidv4 } from "uuid"
import HttpStatus from "@/constants/http_status"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/utils/interfaces"
import authOptions from "@/lib/auth"
import { createSiteDB } from "@/db/site"
import { updateUserLinkedinAdded } from "@/db/user"
import Themes from "@/constants/themes"

/**
 *
 * @param request
 * @returns ISite
 * @description fetch data from of the profile using linkedin url.
 *    Create Site data for the user and return the created data.
 *    If linkedin url not provided then add the basic site info for user
 *    Requires users session
 * @author Aditya Narayan Rai
 */

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    let site_data: ISite | null

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatus.UNAUTHORIZED }
      )
    }
    const user_id: string = session.user.id
    const { searchParams } = new URL(request.url)
    const linkedinURL: string | null = searchParams.get("linkedinURL")
    const withLinkedin: boolean = searchParams.get("withLinkedin") === "true"

    if (!linkedinURL && withLinkedin)
      return NextResponse.json(
        {
          error: "linkedin url is required",
        },
        {
          status: HttpStatus.BAD_REQUEST,
        }
      )

    if (!withLinkedin) {
      site_data = { username: uuidv4(), userId: user_id } as ISite
    } else {
      const res = await fetch(
        `${process.env.PROXY_CURL_BASE}/api/v2/linkedin?url=${linkedinURL}&fallback_to_cache=on-error&use_cache=if-present&skills=include`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PROXY_CURL_KEY}`,
          },
        }
      )

      if (res.ok && res.status === HttpStatus.SUCCESS) {
        const data = await res.json()
        site_data = {
          profile_picture: data["profile_pic_url"],
          linkedin_url: linkedinURL,
          username: uuidv4(),
          first_name: data["first_name"],
          last_name: data["last_name"],
          occupation: data["occupation"],
          experiences: (data["experiences"] as any[]).map((value, index) => {
            return {
              starts_at: value["starts_at"]
                ? new Date(
                    value["starts_at"]["year"],
                    value["starts_at"]["month"] - 1,
                    value["starts_at"]["day"]
                  )
                : null,
              ends_at: value["ends_at"]
                ? new Date(
                    value["ends_at"]["year"],
                    value["ends_at"]["month"] - 1,
                    value["ends_at"]["day"]
                  )
                : null,
              company: value["company"],
              company_linkedin_profile_url:
                value["company_linkedin_profile_url"],
              title: value["title"],
              description: value["description"],
              location: value["location"],
              logo: value["logo_url"],
            } as IExperience
          }),
          education: (data["education"] as any[]).map((value, index) => {
            return {
              starts_at: value["starts_at"]
                ? new Date(
                    value["starts_at"]["year"],
                    value["starts_at"]["month"] - 1,
                    value["starts_at"]["day"]
                  )
                : null,
              ends_at: value["ends_at"]
                ? new Date(
                    value["ends_at"]["year"],
                    value["ends_at"]["month"] - 1,
                    value["ends_at"]["day"]
                  )
                : null,
              field_of_study: value["field_of_study"],
              school: value["school"],
              degree_name: value["degree_name"],
              logo: value["logo_url"],
            } as IEducation
          }),
          courses: (data["accomplishment_courses"] as any[]).map(
            (value) => value["name"]
          ),
          skills: data["skills"],
          projects: (data["accomplishment_projects"] as any[]).map(
            (value, index) => {
              return {
                starts_at: value["starts_at"]
                  ? new Date(
                      value["starts_at"]["year"],
                      value["starts_at"]["month"] - 1,
                      value["starts_at"]["day"]
                    )
                  : null,
                ends_at: value["ends_at"]
                  ? new Date(
                      value["ends_at"]["year"],
                      value["ends_at"]["month"] - 1,
                      value["ends_at"]["day"]
                    )
                  : null,
                title: value["title"],
                description: value["description"],
                url: value["url"],
              } as IProject
            }
          ),
          certificates: (data["certifications"] as any[]).map((value, idx) => {
            return {
              starts_at: value["starts_at"]
                ? new Date(
                    value["starts_at"]["year"],
                    value["starts_at"]["month"] - 1,
                    value["starts_at"]["day"]
                  )
                : null,
              ends_at: value["ends_at"]
                ? new Date(
                    value["ends_at"]["year"],
                    value["ends_at"]["month"] - 1,
                    value["ends_at"]["day"]
                  )
                : null,
              authority: value["authority"],
              name: value["name"],
              url: value["url"],
            } as ICertificate
          }),
          userId: user_id,
        } as ISite
        // save this data into db
      } else {
        return NextResponse.json(
          {
            error:
              "Either the URL is not valid or the API is down. Try after sometime",
          },
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          }
        )
      }
    }
    console.log("user_site", site_data)
    const user_site = await createSiteDB(site_data, Themes.BASIC_THEMES)
    if (user_site) {
      await updateUserLinkedinAdded(true, user_id)
    }
    return NextResponse.json(user_site, { status: HttpStatus.SUCCESS })
  } catch (e) {
    console.log("error", e)
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    )
  }
}
