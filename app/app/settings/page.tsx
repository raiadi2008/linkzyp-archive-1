"use client"

import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AccountSettings from "@/components/settings/account"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/types/interfaces"
import HttpStatus from "@/constants/http_status"

const navbar = [
  "Account",
  "Themes",
  "Links",
  "Work Experience",
  "Education",
  "Skills and Courses",
  "Projects",
  "Certificates",
]

function CurrentSettingsSection(
  index: number,
  siteInfo: ISite | null,
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
) {
  switch (index) {
    case 0:
      return (
        <AccountSettings siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
      )
    case 1:
      return <div>Themes</div>
    case 2:
      return <div>Links</div>
    case 3:
      return <div>Work Experience</div>
    case 4:
      return <div>Education</div>
    case 5:
      return <div>Skills and Courses</div>
    case 6:
      return <div>Projects</div>
    case 7:
      return <div>Certificates</div>
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
  const [activeTab, setActiveTab] = useState(0)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)

  const router = useRouter()

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
          user_id: data["user_id"],
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
        setLoadingInfo(false)
      })
  }, [])

  useEffect(() => {
    console.log(siteInfo)
  }, [siteInfo])

  function changeTab(index: number) {
    setActiveTab(index)
  }

  return (
    <main className='' id='settings'>
      <section className='mx-auto max-w-website py-6 overflow-hidden'>
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
          {CurrentSettingsSection(activeTab, siteInfo, updateSiteInfo)}
        </div>
      </section>
    </main>
  )
}
