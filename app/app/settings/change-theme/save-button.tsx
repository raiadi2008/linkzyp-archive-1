"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface ISaveButton {
  theme_id: string
}

export function SaveButton({ theme_id }: ISaveButton) {
  console.log("theme", theme_id)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const payload = { theme_id: theme_id }
  async function changeTheme() {
    setLoading(true)
    const res = await fetch("/api/site/theme", {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      router.push(`/${data["username"]}`)
    }
  }
  return (
    <button
      disabled={loading}
      onClick={changeTheme}
      className='rounded border border-gray-400 px-6 py-2'
    >
      Select
    </button>
  )
}
