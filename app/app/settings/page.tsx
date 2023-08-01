"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AccountSettings from "@/components/settings/account"
import { ISite } from "@/types/interfaces"

const navbar = [
  "Account",
  "Themes",
  "Links",
  "Work Experience",
  "Education",
  "Skills and Courses",
  "Projects",
  "Certificates",
]

function CurrentSettingsSection(index: number) {
  switch (index) {
    case 0:
      return <AccountSettings />
    case 1:
      return <div>Themes</div>
    case 2:
      return <div>Links</div>
    case 3:
      return <div>Work Experience</div>
    case 4:
      return <div>Education</div>
    case 5:
      return <div>Skills and Courses</div>
    case 6:
      return <div>Projects</div>
    case 7:
      return <div>Certificates</div>
  }
}

async function getUserInfo(username: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user?username=${username}`
  )
  if (res.ok) {
    const data = await res.json()

    return data
  }
  return null
}

export default function Page() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState(0)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/app/login")
    }
  }, [router, status])

  function changeTab(index: number) {
    setActiveTab(index)
  }

  return (
    <main className='' id='settings'>
      <section className='mx-auto max-w-website py-6 overflow-hidden'>
        <h1 className='text-4xl font-bold mb-12'>Settings</h1>
        <div id='settings-sidebar' className='overflow-x-auto mb-6'>
          <ul className='flex gap-x-4  border-b border-gray-200 child:p-2 w-fit child:whitespace-nowrap'>
            {navbar.map((item, index) => {
              return (
                <li
                  onClick={() => changeTab(index)}
                  key={index}
                  className={`text-base ${
                    index === activeTab
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
        <div id='settings-content'>{CurrentSettingsSection(activeTab)}</div>
      </section>
    </main>
  )
}
