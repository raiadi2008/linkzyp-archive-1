"use client"

import Loader from "@/components/loader/loader"
import HttpStatus from "@/constants/http_status"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Page() {
  const [linkedinURL, setLinkedinURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status, update } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/app/login")
    }
    if (session?.user.added_linkedin) {
      router.push("/app/settings")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  function handleLinkedinChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkedinURL(event.target.value)
    setError(null)
  }

  async function handleSumbit(withLinkedin: boolean = true) {
    const url = linkedinURL

    if (url.length === 0 && withLinkedin) {
      setError("Please enter a valid URL")
      return
    }
    setLinkedinURL("")
    setLoading(true)
    const urlParms = withLinkedin
      ? `?linkedinURL=${url}&withLinkedin=true`
      : "withLinkedin=false"

    const userInfo = await fetch(`/api/add-linkedin?${urlParms}`)
    if (userInfo.status === HttpStatus.SUCCESS && userInfo.ok) {
      const data = await userInfo.json()

      await update({
        ...session,
        user: {
          ...session?.user,
          added_linkedin: true,
        },
      })
    } else {
      setError("Something went wrong. Retry after some time")
    }

    setLoading(false)
  }

  return (
    <main className='px-6' id='linkedin-url-page'>
      <div className='max-w-micro mx-auto flex flex-col  py-24'>
        <h1 className='text-3xl font-medium capitalize mb-8 text-center lg:text-2xl sm:text-xl'>
          Add your LinkedIn profile URL
        </h1>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded'
          placeholder='https://www.linkedin.com/in/...'
          value={linkedinURL}
          disabled={loading}
          onChange={handleLinkedinChange}
        />
        <p className='h-4 text-sm text-neutral-red'>{error}</p>

        <button
          className='bg-primary mt-4 text-neutral-white text-lg border font-medium px-6 py-2 rounded-md relative disabled:bg-primary-light'
          onClick={(e) => handleSumbit(true)}
          disabled={loading}
        >
          {loading ? (
            <div className='px-5'>
              <Loader />
            </div>
          ) : (
            "Continue"
          )}
        </button>
        <div className='my-8 border-t border-neutral-300 relative'>
          <p className='text-neutral-500 absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4'>
            OR
          </p>
        </div>
        <button
          className='border border-gray-300 rounded-md px-6 py-2 disabled:text-neutral-500'
          disabled={loading}
          onClick={(e) => handleSumbit(false)}
        >
          Continue Without Linkedin
        </button>
      </div>
    </main>
  )
}
