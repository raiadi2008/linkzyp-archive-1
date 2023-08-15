"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { signOut } from "next-auth/react"

import logo from "@/public/logo.png"

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
import Link from "next/link"

const TAB = "tab"

export default function Page() {
  const { data: session, status } = useSession()

  const [isLoading, setIsLoading] = useState(true)
  const [valuesChanged, setValuesChanged] = useState(false)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/app/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    setIsLoading(true)
    if (!searchParams.get(TAB)) {
      router.push(`?${TAB}=profile`)
    }
    setIsLoading(true)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function changeTab(index: number) {
    router.push(`?${TAB}=${navbarMap.get(navbar[index])}`)
  }

  return (
    <main
      className='w-screen relative h-screen overflow-y-scroll no-scrollbar'
      id='settings'
    >
      <section className='mx-auto max-w-website px-6'>
        <div className='relative flex justify-between items-center py-6'>
          <Link href='/'>
            <div className='relative flex gap-x-2 items-center'>
              <Image src={logo} alt='logo' className='w-10 h-10' />
              <h2 className='text-xl text-neutral-dark font-medium'>Linkzyp</h2>
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className='text-neutral-white border-2 border-primary bg-primary rounded-full px-6 py-2 font-medium'
          >
            Logout
          </button>
        </div>
      </section>
      <section className='mx-auto max-w-website px-6'>
        <h1 className='text-3xl font-bold mb-6'>Settings</h1>
        <div id='settings-sidebar' className='overflow-x-auto no-scrollbar'>
          <ul className='flex gap-x-4  border-b border-gray-200 child:p-2 w-fit child:whitespace-nowrap'>
            {navbar.map((item, index) => {
              return (
                <li
                  onClick={() => changeTab(index)}
                  key={index}
                  className={`text-base ${
                    navbarMap.get(item) === searchParams.get(TAB)
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

      {CurrentSettingsSection(
        searchParams.get(TAB),
        siteInfo,
        valuesChanged,
        isLoading,
        setIsLoading,
        setValuesChanged,
        updateSiteInfo
      )}
    </main>
  )
}
