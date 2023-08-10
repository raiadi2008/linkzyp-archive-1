"use client"

import HttpStatus from "@/constants/http_status"
import { parseSiteDataFromJSON } from "@/utils/functions"
import { ISite, ISiteUpdates } from "@/utils/interfaces"
import Link from "next/link"
import { Dispatch, SetStateAction, use, useEffect, useState } from "react"
import { json } from "stream/consumers"

interface ProfileInputError {
  first_name: boolean
  last_name: boolean
  username: boolean
  occupation: boolean
}

export default function ProfileSettings({
  siteInfo,
  valuesChanged,
  setValuesChanged,
  setSiteInfo,
  setIsLoading,
}: ISiteUpdates) {
  const [profileInfo, setProfileInfo] = useState<ISite>({
    first_name: siteInfo.first_name,
    last_name: siteInfo.last_name,
    occupation: siteInfo.occupation,
    username: siteInfo.username,
  } as ISite)
  const [profileInputError, setProfileInputError] = useState<ProfileInputError>(
    {
      first_name: false,
      last_name: false,
      username: false,
      occupation: false,
    }
  )

  const portfolioURL = new URL(
    siteInfo.username!,
    process.env.NEXT_PUBLIC_BASE_URL
  )

  useEffect(() => {
    if (
      profileInfo.first_name !== siteInfo.first_name ||
      profileInfo.last_name !== siteInfo.last_name ||
      profileInfo.occupation !== siteInfo.occupation ||
      profileInfo.username !== siteInfo.username
    ) {
      setValuesChanged(true)
    }
  }, [profileInfo])

  function discardProfileChanges() {
    setProfileInfo({
      first_name: siteInfo.first_name,
      last_name: siteInfo.last_name,
      occupation: siteInfo.occupation,
      username: siteInfo.username,
    } as ISite)
    setValuesChanged(false)
  }

  async function saveProfileChanges() {
    setIsLoading(true)
    const profileError = { ...profileInputError }
    if (!profileInfo.first_name || profileInfo.first_name.length === 0)
      profileError.first_name = true

    if (!profileInfo.last_name || profileInfo.last_name.length === 0)
      profileError.last_name = true

    if (!profileInfo.username || profileInfo.username.length === 0)
      profileError.username = true

    if (!profileInfo.occupation || profileInfo.occupation.length === 0)
      profileError.occupation = true

    setProfileInputError(profileError)

    if (Object.values(profileError).some((error) => error === true)) {
      setIsLoading(false)
      return
    }

    const res = await fetch("/api/site/profile", {
      method: "PUT",
      body: JSON.stringify(profileInfo),
    })

    if (res.ok && res.status === HttpStatus.SUCCESS) {
      const data = await res.json()
      const parsedData = parseSiteDataFromJSON(data)
      setSiteInfo(parsedData)
      setValuesChanged(false)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
        <div className='max-w-medium-website'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>First Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Value is used to display your first name
                </span>
                <span className='block'>on the portfolio site as required</span>
              </p>
            </div>
            <input
              className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                profileInputError.first_name
                  ? "border-b border-neutral-red"
                  : "focus:border-gray-300"
              } `}
              value={profileInfo.first_name}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 0 && !profileInputError.first_name) {
                  setProfileInputError({
                    ...profileInputError,
                    first_name: true,
                  })
                }
                if (value.length > 0 && profileInputError.first_name) {
                  setProfileInputError({
                    ...profileInputError,
                    first_name: false,
                  })
                }
                setProfileInfo({
                  ...profileInfo,
                  first_name: value,
                })
              }}
            />
          </div>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>Last Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Value is used to display your last name
                </span>
                <span className='block'>on the portfolio site as required</span>
              </p>
            </div>
            <input
              className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                profileInputError.last_name
                  ? "border-b border-neutral-red"
                  : "focus:border-gray-300"
              } `}
              value={profileInfo.last_name}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 0 && !profileInputError.last_name) {
                  setProfileInputError({
                    ...profileInputError,
                    last_name: true,
                  })
                }
                if (value.length > 0 && profileInputError.last_name) {
                  setProfileInputError({
                    ...profileInputError,
                    last_name: false,
                  })
                }
                setProfileInfo({
                  ...profileInfo,
                  last_name: value,
                })
              }}
            />
          </div>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>Occupation</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Will be used to create a tag-line for the
                </span>
                <span className='block'>
                  header. eg Hi, I am content writer
                </span>
              </p>
            </div>
            <input
              className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                profileInputError.occupation
                  ? "border-b border-neutral-red"
                  : "focus:border-gray-300"
              } `}
              value={profileInfo.occupation}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 0 && !profileInputError.occupation) {
                  setProfileInputError({
                    ...profileInputError,
                    occupation: true,
                  })
                }
                if (value.length > 0 && profileInputError.occupation) {
                  setProfileInputError({
                    ...profileInputError,
                    occupation: false,
                  })
                }
                setProfileInfo({
                  ...profileInfo,
                  occupation: value,
                })
              }}
            />
          </div>
          <div className='flex justify-between items-center mb-2'>
            <div>
              <label>Username</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Won't be visible on site. Username will make
                </span>
                <span className='block'>
                  the url where your portfolio is accessible.
                </span>
              </p>
            </div>
            <input
              className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                profileInputError.username
                  ? "border-b border-neutral-red"
                  : "focus:border-gray-300"
              } `}
              value={profileInfo.username}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 0 && !profileInputError.username) {
                  setProfileInputError({
                    ...profileInputError,
                    username: true,
                  })
                }
                if (value.length > 0 && profileInputError.username) {
                  setProfileInputError({
                    ...profileInputError,
                    username: false,
                  })
                }
                setProfileInfo({
                  ...profileInfo,
                  username: value,
                })
              }}
            />
          </div>
          <div className='flex gap-x-12'>
            <Link href={portfolioURL.toString()} target='_blank'>
              <p className='text-gray-500 font-semibold text-sm'>
                Open Portfolio<span className='text-xs'>&#x2197;</span>
              </p>
            </Link>
            <p
              className='text-gray-500 font-semibold text-sm hover:cursor-pointer active:text-xs'
              onClick={() =>
                navigator.clipboard.writeText(portfolioURL.toString())
              }
            >
              Copy Portfolio Url
            </p>
          </div>
        </div>
      </section>

      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              onClick={discardProfileChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveProfileChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
