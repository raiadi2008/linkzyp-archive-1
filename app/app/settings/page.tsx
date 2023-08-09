"use client"

import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "@/utils/interfaces"
import { navbar, navbarMap } from "@/constants/settings_navbar"
import CurrentSettingsSection from "./tab_selector"
import getUserInfo from "./fetch"

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
    router.push(`?tab=${navbarMap.get("Profile")}`)
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
    <main className='w-screen relative' id='settings'>
      <section className='mx-auto max-w-website py-6'>
        <h1 className='text-3xl font-bold mb-6'>Settings</h1>
        <div id='settings-sidebar' className='overflow-x-auto'>
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
      </section>
      <div id='settings-content'>
        {CurrentSettingsSection(
          searchParams.get("tab"),
          siteInfo,
          setValuesChanged,
          updateSiteInfo
        )}
      </div>
    </main>
  )
}
