"use client"

import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProfileSettings from "@/components/settings/profile/profile"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/utils/interfaces"
import HttpStatus from "@/constants/http_status"
import WorkExperience from "@/components/settings/work-experience/work-experience"
import Education from "@/components/settings/education/education"
import SkillsAndCourses from "@/components/settings/skills-and-courses/skills-and-courses"
import Projects from "@/components/settings/projects/projects"
import Certificates from "@/components/settings/cetificates/certificates"

const navbar = [
  "Profile",
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
    case 1:
      if (siteInfo) {
        return (
          <WorkExperience siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
        )
      } else {
        return <div>Loading...</div>
      }
    case 2:
      if (siteInfo) {
        return <Education siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
      } else {
        return <div>Loading...</div>
      }
    case 3:
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
    case 4:
      if (siteInfo) {
        return <Projects siteInfo={siteInfo} updateSiteInfo={updateSiteInfo} />
      } else {
        return <div>Loading...</div>
      }
    case 5:
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
  const [activeTab, setActiveTab] = useState(0)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/app/login")
    }
  }, [status])

  async function updateUserSiteData() {
    setLoadingInfo(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/site/settings`,
      {
        method: "PUT",
        body: JSON.stringify(siteInfo),
      }
    )
    if (res.ok && res.status === HttpStatus.SUCCESS) {
      const data = await res.json()
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
    }

    setLoadingInfo(false)
  }

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
        setLoadingInfo(false)
      })
  }, [])

  function changeTab(index: number) {
    setActiveTab(index)
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
          {CurrentSettingsSection(activeTab, siteInfo, updateSiteInfo)}
        </div>
      </section>
      <section className='absolute bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto sticky bottom-0'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            {/* <button
            onClick={(e) => {
              discardChanges()
            }}
            className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
          >
            Discard Changes
          </button> */}
            <button
              disabled={loadingInfo}
              onClick={(e) => updateUserSiteData()}
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
