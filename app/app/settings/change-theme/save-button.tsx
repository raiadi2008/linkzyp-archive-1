"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import Loader from "@/components/loader/loader"
import Link from "next/link"

interface ISaveButton {
  theme_id: string
}

export function SaveButton({ theme_id }: ISaveButton) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState("")

  async function changeTheme() {
    const payload = { theme_id: theme_id }
    setLoading(true)
    const res = await fetch("/api/site/theme", {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      setUsername(data["username"])
      setVisible(true)
    }
    setLoading(false)
  }
  return (
    <>
      <div
        onClick={() => setVisible(false)}
        className={`z-50 h-screen w-screen bg-black bg-opacity-90 fixed top-0 left-0 ${
          visible ? "visible" : "hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='bg-white px-12 py-6 max-w-lg rounded-lg mx-auto mt-32 relative flex flex-col items-end'
        >
          Your theme has been changed succesfully
          <div className='flex gap-x-8 mt-8'>
            <button
              onClick={(e) => setVisible(false)}
              className='px-6 py-2 rounded border border-primary text-primary text-sm font-semibold'
            >
              OK
            </button>
            <Link href={`/${username}`} target='_blank'>
              <button
                onClick={(e) => setVisible(false)}
                className='px-6 py-2 rounded border border-primary text-white bg-primary text-sm font-semibold'
              >
                Open Portfolio
              </button>
            </Link>
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={changeTheme}
        className='rounded border border-gray-400 px-6 py-2'
      >
        {loading ? <Loader /> : "Select"}
      </button>
    </>
  )
}
