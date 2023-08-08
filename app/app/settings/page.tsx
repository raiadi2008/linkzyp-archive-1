"use client"

import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import ProfileSettings from "@/components/settings/profile/profile"
import HttpStatus from "@/constants/http_status"
import WorkExperience from "@/components/settings/work-experience/work-experience"
import Education from "@/components/settings/education/education"
import SkillsAndCourses from "@/components/settings/skills-and-courses/skills-and-courses"
import Projects from "@/components/settings/projects/projects"
import Certificates from "@/components/settings/cetificates/certificates"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/utils/interfaces"

const navbar = [
  "Profile",
  "Experience",
  "Education",
  "Skills and Courses",
  "Projects",
  "Certificates",
  "Links and Socials",
  "FAQs",
]

const navbarMap = new Map<string, string>([
  ["Profile", "profile"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Skills and Courses", "skills-and-courses"],
  ["Projects", "projects"],
  ["Certificates", "certificates"],
  ["Links and Socials", "links-and-socials"],
  ["FAQs", "faqs"],
])

function CurrentSettingsSection(
  tab: string | null,
  siteInfo: ISite | null,
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
) {
  switch (tab) {
    case "profile":
      if (siteInfo) {
        return (
          <ProfileSettings
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "experience":
      if (siteInfo) {
        return (
          <WorkExperience siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
        )
      } else {
        return <div>Loading...</div>
      }
    case "education":
      if (siteInfo) {
        return <Education siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
      } else {
        return <div>Loading...</div>
      }
    case "skills-and-courses":
      if (siteInfo) {
        return (
          <SkillsAndCourses
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "projects":
      if (siteInfo) {
        return <Projects siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
      } else {
        return <div>Loading...</div>
      }
    case "certificates":
      if (siteInfo) {
        return (
          <Certificates siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
        )
      } else {
        return <div>Loading...</div>
      }
  }
}

async function getUserInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/site/settings`,
    {
      method: "GET",
    }
  )
  if (res.ok && res.status === HttpStatus.SUCCESS) {
    const data = await res.json()
    return data
  }
  throw Error("Error fetching site info")
}

export default function Page() {
  const { data: session, status } = useSession()

  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [valuesChanged, setValuesChanged] = useState(false)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {}, [searchParams])

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/app/login")
    }
  }, [status])

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        updateSiteInfo({
          id: data["id"],
          userId: data["userId"],
          username: data["username"],
          profile_picture: data["profile_picture"],
          first_name: data["first_name"],
          last_name: data["last_name"],
          linkedin_url: data["linkedin_url"],
          occupation: data["occupation"],
          experiences: data["experiences"] as IExperience[],
          education: data["education"] as IEducation[],
          projects: data["projects"] as IProject[],
          certificates: data["certificates"] as ICertificate[],
          skills: data["skills"] as string[],
          courses: data["courses"] as string[],
        } as ISite)
      })
      .catch((err) => {
        router.push("/app/login")
        return null
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  function changeTab(index: number) {
    setActiveTab(index)
    router.push(`?tab=${navbarMap.get(navbar[index])}`)
  }

  return (
    <main className='h-screen w-screen overflow-scroll' id='settings'>
      <section className='mx-auto max-w-website py-6 mb-36'>
        <h1 className='text-4xl font-bold mb-12'>Settings</h1>
        <div id='settings-sidebar' className='overflow-x-auto mb-12'>
          <ul className='flex gap-x-4  border-b border-gray-200 child:p-2 w-fit child:whitespace-nowrap'>
            {navbar.map((item, index) => {
              return (
                <li
                  onClick={() => changeTab(index)}
                  key={index}
                  className={`text-base ${
                    index === activeTab
                      ? "text-neutral-dark border-b border-neutral-dark"
                      : "text-gray-500 hover:cursor-pointer"
                  }`}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div id='settings-content'>
          {CurrentSettingsSection(
            searchParams.get("tab"),
            siteInfo,
            updateSiteInfo
          )}
        </div>
      </section>
      <section className='absolute bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto sticky bottom-0'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              disabled={isLoading}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              disabled={isLoading}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
