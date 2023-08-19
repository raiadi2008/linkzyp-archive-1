"use client"

import HttpStatus from "@/constants/http_status"
import useDebouncer from "@/hooks/useDebouncer"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import { ISite, ISiteUpdates } from "@/app/utils/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ProfileInputError {
  first_name: boolean
  last_name: boolean
  username: boolean
  occupation: boolean
}

enum UsernameAvailablityCheck {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  LOADING = "loading",
  IDLE = "idle",
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
  const username = useDebouncer(profileInfo.username, 500)
  const [usernameAvailablity, setUsernameAvailablity] =
    useState<UsernameAvailablityCheck>(UsernameAvailablityCheck.IDLE)

  const portfolioURL = new URL(
    siteInfo.username!,
    process.env.NEXT_PUBLIC_BASE_URL
  )

  useEffect(() => {
    async function checkUsernameAvailablity() {
      if (username.length < 4 || username === siteInfo.username) {
        setUsernameAvailablity(UsernameAvailablityCheck.IDLE)
        return
      }
      setUsernameAvailablity(UsernameAvailablityCheck.LOADING)
      const res = await fetch(`/api/site/username?username=${username}`)
      if (res.ok && res.status === HttpStatus.SUCCESS) {
        const data = await res.json()

        if (data["available"]) {
          setUsernameAvailablity(UsernameAvailablityCheck.AVAILABLE)
        } else {
          setUsernameAvailablity(UsernameAvailablityCheck.UNAVAILABLE)
        }
      }
    }
    checkUsernameAvailablity()
      .then()
      .catch((e) => setUsernameAvailablity(UsernameAvailablityCheck.IDLE))

    return () => {
      checkUsernameAvailablity
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    if (
      profileInfo.first_name !== siteInfo.first_name ||
      profileInfo.last_name !== siteInfo.last_name ||
      profileInfo.occupation !== siteInfo.occupation ||
      profileInfo.username !== siteInfo.username
    ) {
      setValuesChanged(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium-website '>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>First Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Value is used to display your first name
                </span>
                <span className='block sm:inline'>
                  on the portfolio site as required
                </span>
              </p>
            </div>
            <div>
              <input
                className={`text-gray-500 text-right outline-none py-1 focus:px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left focus:border-b focus:text-neutral-dark ${
                  profileInputError.first_name
                    ? "border-b border-neutral-red"
                    : "focus:border-gray-300"
                } sm:text-left sm:mt-2`}
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
              {profileInputError.first_name && (
                <p className='text-xs font-extralight text-dark-red'>
                  first name can&apos;t be empty
                </p>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Last Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Value is used to display your last name
                </span>
                <span className='block sm:inline'>
                  on the portfolio site as required
                </span>
              </p>
            </div>
            <div>
              <input
                className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 focus:px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                  profileInputError.last_name
                    ? "border-b border-neutral-red"
                    : "focus:border-gray-300"
                } sm:text-left sm:mt-2`}
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
              {profileInputError.last_name && (
                <p className='text-xs font-extralight text-dark-red'>
                  last name can&apos;t be empty
                </p>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Occupation</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Will be used to create a tag-line for the
                </span>
                <span className='block sm:inline'>
                  header. eg Hi, I am content writer
                </span>
              </p>
            </div>
            <div>
              <input
                className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 focus:px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                  profileInputError.occupation
                    ? "border-b border-neutral-red"
                    : "focus:border-gray-300"
                } sm:text-left sm:mt-2`}
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
              {profileInputError.occupation && (
                <p className='text-xs font-extralight text-dark-red'>
                  occupation can&apos;t be empty
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center mb-2 sm:flex-col sm:items-start'>
            <div>
              <label>Username</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Won&apos;t be visible on site. Username will make
                </span>
                <span className='block sm:inline'>
                  the url where your portfolio is accessible.
                </span>
              </p>
            </div>
            <div>
              <input
                className={`text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark  py-1 focus:px-2 focus:bg-gray-100 rounded-t w-72 focus:text-left ${
                  profileInputError.username
                    ? "border-b border-neutral-red"
                    : "focus:border-gray-300"
                } sm:text-left sm:mt-2`}
                value={profileInfo.username}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length < 4) {
                    setProfileInputError({
                      ...profileInputError,
                      username: true,
                    })
                  }
                  if (value.length >= 4 && profileInputError.username) {
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
              {profileInputError.username && (
                <p className='text-xs font-extralight text-dark-red'>
                  username should be atleast 4 characters long
                </p>
              )}
              {usernameAvailablity === UsernameAvailablityCheck.AVAILABLE && (
                <p className='text-xs font-extralight text-green-800'>
                  username is available
                </p>
              )}
              {usernameAvailablity === UsernameAvailablityCheck.UNAVAILABLE && (
                <p className='text-xs font-extralight  text-dark-red'>
                  username is not available
                </p>
              )}
            </div>
          </div>
          <div className='flex gap-x-12 sm:mt-6'>
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

      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
            <button
              onClick={discardProfileChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveProfileChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
