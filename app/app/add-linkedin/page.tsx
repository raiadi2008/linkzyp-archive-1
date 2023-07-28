"use client"

import Loader from "@/components/loader"
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
    console.log(session)
    if (status !== "authenticated") {
      router.push("/app/login")
    }
    if (session?.user.added_linkedin) {
      router.push("/app/settings")
    }
  }, [router, session, status, update])

  function handleLinkedinChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkedinURL(event.target.value)
    setError(null)
  }

  async function handleSumbit() {
    const url = linkedinURL
    setLinkedinURL("")
    setLoading(true)
    const userInfo = await fetch(`/api/linkedin-data?linkedinURL=${url}`)
    if (userInfo.status === HttpStatus.SUCCESS && userInfo.ok) {
      const data = await userInfo.json()
      await update({
        ...session,
        user: {
          added_linkedin: true,
        },
      })
    } else {
      setError("Something went wrong. Retry after some time")
    }

    setLoading(false)
  }

  return (
    <main className='linkedin-url-page'>
      <div className='max-w-website mx-auto flex flex-col items-center py-24 px-4'>
        <h1 className='text-3xl font-medium capitalize mb-10 text-center lg:text-2xl sm:text-xl'>
          Add your LinkedIn profile URL
        </h1>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded w-96 mb-8 lg:w-80 sm:w-72'
          placeholder='https://www.linkedin.com/in/...'
          value={linkedinURL}
          disabled={loading}
          onChange={handleLinkedinChange}
        />
        <p className='h-4 text-sm text-dark-red'>{error}</p>
        <button
          className='bg-primary text-neutral-white text-lg font-medium px-6 py-2 rounded-md relative'
          onClick={handleSumbit}
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
      </div>
    </main>
  )
}
