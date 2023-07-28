import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getServerSession } from "next-auth"

import HttpStatus from "@/constants/http_status"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/types/interfaces"
import authOptions from "@/lib/auth"
import { createSiteDB } from "@/db/site"
import { updateUserLinkedinAdded } from "@/db/user"
import Themes from "@/constants/themes"

export async function GET(request: NextRequest) {
  try {
    // step 1: Check for session
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatus.UNAUTHORIZED }
      )
    }

    // extract user id from session
    const user_id: string = session.user.id

    // extract linkedin url from params
    const { searchParams } = new URL(request.url)
    const linkedinURL: string | null = searchParams.get("linkedinURL")
    if (!linkedinURL)
      return NextResponse.json(
        {
          error: "linkedinURL is required",
        },
        {
          status: HttpStatus.BAD_REQUEST,
        }
      )
    else {
      // fetch data of the linkedin url
      const res = await fetch(
        `${process.env.PROXY_CURL_BASE}/api/v2/linkedin?url=${linkedinURL}&fallback_to_cache=on-error&use_cache=if-present&skills=include`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PROXY_CURL_KEY}`,
          },
        }
      )
      // if data create site data now
      if (res.ok && res.status === HttpStatus.SUCCESS) {
        // if response is recieved save the data in the url
        const data = await res.json()
        const site_data = {
          profile_picture: data["profile_pic_url"],
          linkedin_url: linkedinURL,
          first_name: data["first_name"],
          last_name: data["last_name"],
          full_name: data["full_name"],
          occupation: data["occupation"],
          summary: data["summary"],
          country: data["country"],
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
        const user_site = await createSiteDB(site_data, Themes.BASIC_THEMES)
        if (user_site) {
          await updateUserLinkedinAdded(true, user_id)
        }
        return NextResponse.json(user_site, { status: HttpStatus.SUCCESS })
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
  } catch (e) {
    console.log(e)
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
