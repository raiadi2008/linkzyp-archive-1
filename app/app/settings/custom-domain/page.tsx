"use client"

import Link from "next/link"
import Image from "next/image"

import logo from "@/public/logo.png"
import { use, useEffect, useState } from "react"
import HttpStatus from "@/constants/http_status"

export default function Page() {
  const [inputError, setInputError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentDomain, setCurrentDomain] = useState<string | null>(null)
  const [verification, setVerification] = useState<any[]>([])

  async function addDomain() {
    console.log(currentDomain)
    const resp = await fetch(`/api/domain`, {
      method: "POST",
      body: JSON.stringify({ domain: currentDomain }),
    })
    if (resp.ok && resp.status === HttpStatus.SUCCESS) {
      const data = await resp.json()
      console.log(data.verification)
      if (data.verification) setVerification(data.verification)
      return data
    }
  }

  async function getDomainData() {
    try {
      const resp = await fetch(`/api/domain`)
      if (resp.ok && resp.status === HttpStatus.SUCCESS) {
        const data = await resp.json()
        return data
      }
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getDomainData()
      .then((data) => {
        if (data) {
          setCurrentDomain(data.domain)
        } else {
          setCurrentDomain(null)
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className='pb-36'>
      <section className='mx-auto max-w-website px-6'>
        <div className='relative flex justify-start items-center py-6'>
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
        </div>
      </section>
      <section className='mx-auto max-w-website px-6'>
        <h1 className='text-3xl font-bold mt-4'>Add Your Custom Domain</h1>
        <p className='mt-12 mb-2 font-semibold'>Step 1:</p>
        <label className='block  mb-2 font-semibold text-lg'>
          Enter your domain
        </label>
        <p className='text-sm text-gray-500 mb-8'>
          <span className='block sm:inline'>
            Add your custom domain. For example you can add example.com{" "}
          </span>
          <span className='block sm:inline'>
            Please don&apos;t add www. Just enter the top level domain. We{" "}
          </span>
          <span className='block sm:inline'>will take care of rest</span>
        </p>
        <div className='flex flex-col w-96 md:w-80'>
          {loading ? (
            <div className='animate-pulse rounded  bg-slate-200 h-11 '></div>
          ) : (
            <input
              value={currentDomain ?? ""}
              onChange={(e) => setCurrentDomain(e.target.value)}
              placeholder='example.com'
              className='px-4 py-2 rounded border border-gray-400 '
            />
          )}
          <button
            disabled={loading}
            onClick={addDomain}
            className='rounded bg-primary font-semibold text-lg text-white px-4 py-2 mt-5 disabled:bg-primary-light'
          >
            Add Domain
          </button>
        </div>

        <p className='mt-24 mb-2 font-semibold'>Step 2:</p>
        <label className='block  mb-2 font-semibold text-lg'>DNS Values</label>
        <p className='text-sm text-gray-500 mb-8'>
          <span className='block sm:inline'>
            Once you have added the domain. You will have to go to{" "}
          </span>
          <span className='block sm:inline'>
            your domain/DNS provider and add the following values.{" "}
          </span>
          <span className='block sm:inline'>
            Once added you can start using the domain. Values will be{" "}
          </span>
          <span className='block sm:inline'>
            Visible after you have completed step 1{" "}
          </span>
        </p>
        <div className='grid grid-cols-3 gap-x-5 gap-y-1  text-sm bg-gray-300 p-6 overflow-x-scroll whitespace-nowrap'>
          <h5 className='font-semibold mb-2'>type</h5>
          <h5 className='font-semibold mb-2'>name</h5>
          <h5 className='font-semibold mb-2'>value</h5>
          <p>A</p>
          <p>@</p>
          <p>76.76.21.21</p>
          <p>CNAME</p>
          <p>www</p>
          <p>cname.vercel-dns.com.</p>
          {verification.length > 0 &&
            verification.map((value, index) => {
              return (
                <>
                  <p>{value.type}</p>
                  <p>_vercel</p>
                  <p>{value.value}</p>
                </>
              )
            })}
        </div>
      </section>
    </main>
  )
}
