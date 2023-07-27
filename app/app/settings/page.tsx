"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const { data: session, status } = useSession()

  const [portfolioUrl, setPortfolioUrl] = useState("")

  const router = useRouter()
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/app/login")
    }
  })

  useEffect(() => {
    const data = fetch("/api/actual-portfolio-url")
      .then((res) => res.json())
      .then((data) => {
        if (data && data["portfolio_url"]) {
          setPortfolioUrl(data["portfolio_url"])
        }
      })
      .catch((err) => {})
  }, [])

  return (
    <div>
      Setting Page. Build in progrees
      <div>Mean while you can see your portfolio here: {portfolioUrl}</div>
    </div>
  )
}
