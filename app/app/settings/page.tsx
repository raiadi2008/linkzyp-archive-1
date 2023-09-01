"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

import logo from "@/public/logo.png"

import { ISite } from "@/app/utils/interfaces"
import { navbar, navbarMap } from "@/constants/settings_navbar"
import CurrentSettingsSection from "./tab_selector"
import getUserInfo from "./fetch"
import Link from "next/link"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import PremiumPopup from "@/components/premium-popup/premium-popup"
import HttpStatus from "@/constants/http_status"
import Loader from "@/components/loader/loader"

const TAB = "tab"

export default function Page() {
  const { data: session, status, update } = useSession()
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [valuesChanged, setValuesChanged] = useState(false)
  const [siteInfo, updateSiteInfo] = useState<ISite | null>(null)
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/app/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

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
            ...session?.user,
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
      getUserSiteData
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function getUsersPaymentStatus() {
      const resp = await fetch("/api/payments/status")
      if (resp.ok && resp.status === HttpStatus.SUCCESS) {
        const payments = await resp.json()

        const test_ = await update({
          ...session,
          user: {
            ...session?.user,
            premium_user: payments.subscription_status,
          },
        })
        console.log(test_)
        console.log("are we here")

        return payments.subscription_status
      }
      return null
    }

    getUsersPaymentStatus()
      .then((data) => {
        setShowPremiumPopup(!data)
      })
      .catch((error) => {})
      .finally(() => {})

    return () => {
      getUsersPaymentStatus
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function changeTab(index: number) {
    router.push(`?${TAB}=${navbarMap.get(navbar[index])}`)
  }

  async function getCheckoutSession() {
    setLoadingCheckout(true)
    const resp = await fetch("/api/payments/create-checkout-session", {
      method: "POST",
    })
    if (resp.ok && resp.status === HttpStatus.SUCCESS) {
      const { checkout_url } = await resp.json()
      setLoadingCheckout(false)
      router.replace(checkout_url)
    }
    setLoadingCheckout(false)
  }

  async function getPortalSession() {
    setLoadingCheckout(true)
    const resp = await fetch("/api/payments/create-portal-session", {
      method: "POST",
    })
    if (resp.ok && resp.status === HttpStatus.SUCCESS) {
      const { url } = await resp.json()
      setLoadingCheckout(false)
      router.replace(url)
    }
    setLoadingCheckout(false)
  }

  return (
    <main
      className='w-screen relative h-screen overflow-y-scroll no-scrollbar'
      id='settings'
    >
      {showPremiumPopup && (
        <PremiumPopup
          show={setShowPremiumPopup}
          loadingCheckout={loadingCheckout}
          setLoadingCheckout={setLoadingCheckout}
        />
      )}
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
          {session?.user.premium_user ? (
            <button
              className='font-bold bg-black text-yellow-500 px-6 py-3 rounded-lg flex items-center gap-x-2'
              onClick={getPortalSession}
            >
              {loadingCheckout && <Loader />}Premium
            </button>
          ) : (
            <button
              className='font-bold bg-black text-yellow-500 px-6 py-3 rounded-lg flex items-center gap-x-2'
              onClick={getCheckoutSession}
            >
              {loadingCheckout && <Loader />}Go Premium
            </button>
          )}
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
