"use client"

import Loader from "@/components/loader"
import HttpStatus from "@/constants/http_status"
import React, { useState } from "react"

export default function Page() {
  const [linkedinURL, setLinkedinURL] = useState("")
  const [loading, setLoading] = useState(false)

  function handleLinkedinChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkedinURL(event.target.value)
  }

  async function handleSumbit() {
    const url = linkedinURL
    setLinkedinURL("")
    setLoading(true)
    const userInfo = await fetch(`/api/linkedin-data?linkedinURL=${url}`)
    if (userInfo.status === HttpStatus.SUCCESS && userInfo.ok) {
      const data = await userInfo.json()
    }
    setLoading(false)
  }

  return (
    <main className='linkedin-url-page'>
      <div className='max-w-website mx-auto flex flex-col items-center py-24'>
        <h1 className='text-3xl font-medium capitalize mb-10'>
          Add your LinkedIn profile URL
        </h1>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded w-96 mb-8'
          placeholder='https://www.linkedin.com/in/...'
          value={linkedinURL}
          disabled={loading}
          onChange={handleLinkedinChange}
        />
        <button
          className='bg-primary text-neutral-white text-lg font-medium px-6 py-2 rounded-md relative'
          onClick={handleSumbit}
          disabled={loading}
        >
          {loading ? (
            <div className='px-5'>
              {" "}
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
