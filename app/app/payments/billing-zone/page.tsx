"use client"

import Loader from "@/components/loader/loader"
import HttpStatus from "@/constants/http_status"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [currency, setCurrency] = useState("usd")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrency(e.target.value)
    console.log(currency)
  }

  async function getCheckoutSession() {
    setLoading(true)
    const resp = await fetch("/api/payments/create-checkout-session", {
      body: JSON.stringify({ currency: currency ?? "usd" }),
      method: "POST",
    })
    if (resp.ok && resp.status === HttpStatus.SUCCESS) {
      const { checkout_url } = await resp.json()
      setLoading(false)
      router.replace(checkout_url)
    }
    setLoading(false)
  }

  return (
    <main className='w-fit mx-auto py-24'>
      <label className='block text-xl font-semibold '>
        Choose your location/billing-zone
      </label>
      <select
        onChange={handleChange}
        className='appearance-none w-full rounded-lg mt-8 border border-gray-500 px-6 py-2'
      >
        <option value='aud'>Australia</option>
        <option value='brl'>Brazil</option>
        <option value='cad'>Canada</option>
        <option value='cny'>China</option>
        <option value='eur'>Europe</option>
        <option value='hkd'>Hong Kong</option>
        <option value='idr'>Indonesia</option>
        <option value='inr'>India</option>
        <option value='jpy'>Japan</option>
        <option value='mxn'>Mexico</option>
        <option value='myr'>Malaysia</option>
        <option value='nok'>Norway</option>
        <option value='nzd'>New Zealand</option>
        <option value='php'>Philippines</option>
        <option value='pln'>Poland</option>
        <option value='rub'>Russia</option>
        <option value='krw'>South Korea</option>
        <option value='sek'>Sweden</option>
        <option value='sgd'>Singapore</option>
        <option value='thb'>Thailand</option>
        <option value='try'>Turkey</option>
        <option selected value='usd'>
          United States
        </option>
        <option value='gbp'>United Kingdom</option>
        <option value='vnd'>Vietnam</option>
        <option value='usd'>Others</option>
      </select>
      <button
        className='bg-green-600 font-semibold text-white rounded text-lg w-full py-2 px-6 mt-8 flex items-center justify-center'
        onClick={getCheckoutSession}
      >
        {loading && <Loader />} Next
      </button>
    </main>
  )
}
