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
} from "@/app/utils/interfaces"
import { navbar, navbarMap } from "@/constants/settings_navbar"
import CurrentSettingsSection from "./tab_selector"
import getUserInfo from "./fetch"
import Link from "next/link"
import { parse } from "path"
import { parseSiteDataFromJSON } from "@/app/utils/functions"

const TAB = "tab"

export default function Page() {
  const { data: session, status, update } = useSession()

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
    if (!session?.user.added_linkedin) {
      router.push("/app/add-linkedin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (!searchParams.get(TAB)) {
      router.push(`?${TAB}=profile`)
    }
    async function getUserSiteData() {
      const siteData = await getUserInfo()
      const parsedSiteData = parseSiteDataFromJSON(siteData)
      if (!parsedSiteData) {
        await update({
          ...session,
          user: {
            added_linkedin: false,
          },
        })
        return null
      } else {
        return parsedSiteData
      }
    }
    setIsLoading(true)
    getUserSiteData()
      .then((data) => {
        updateSiteInfo(data)
      })
      .catch((err) => {
        router.push("/app/login")
        return null
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      getUserSiteData()
    }
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
              <Image
                src={logo}
                alt='logo'
                className='w-10 h-10 md:w-8 md:h-10'
              />
              <h2 className='text-xl text-neutral-dark font-medium md:text-lg'>
                Linkzyp
              </h2>
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className='text-neutral-white border-2 border-primary bg-primary rounded-full px-6 py-2 font-medium md:border'
          >
            Logout
          </button>
        </div>
      </section>
      <section className='mx-auto max-w-website px-6'>
        <h1 className='text-3xl font-bold mb-6 md:text-2xl '>Settings</h1>
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
