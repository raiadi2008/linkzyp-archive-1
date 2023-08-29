"use client"

import Link from "next/link"
import Image from "next/image"

import logo from "@/public/logo.png"
import { use, useEffect, useState } from "react"
import HttpStatus from "@/constants/http_status"

interface IVerification {
  type: string
  name: string
  value: string
}

const genralVerification: IVerification[] = [
  { name: "@", type: "A", value: "76.76.21.21" },
  { name: "www", type: "CNAME", value: "cname.vercel-dns.com." },
]

export default function Page() {
  const [inputError, setInputError] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [currentDomain, setCurrentDomain] = useState<string | null>(null)
  const [inputDomain, setInputDomain] = useState<string | null>(null)
  const [verification, setVerification] =
    useState<IVerification[]>(genralVerification)

  async function addDomain() {
    if (
      !inputDomain ||
      inputDomain.split(".").length !== 2 ||
      inputDomain.split(".")[0].length === 0 ||
      inputDomain.split(".")[1].length === 0
    ) {
      setInputError(true)
      return
    }
    setLoading(true)
    const resp = await fetch(`/api/domain`, {
      method: "POST",
      body: JSON.stringify({ domain: inputDomain }),
    })

    if (resp.ok && resp.status === HttpStatus.SUCCESS) {
      const data = await resp.json()
      setCurrentDomain(data.domain)
      setInputDomain(data.domain)
      if (data.verification) {
        const _verification = genralVerification
        for (let v of data.verification) {
          _verification.push({
            name: "_vercel",
            type: v.type,
            value: v.value,
          } as IVerification)
        }
        setVerification(_verification)
      }
    }
    setLoading(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (
      value.split(".").length !== 2 ||
      value.split(".")[0].length === 0 ||
      value.split(".")[1].length === 0
    ) {
      setInputError(true)
    } else {
      setInputError(false)
    }
    setInputDomain(e.target.value)
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
          setInputDomain(data.domain)
          setCurrentDomain(data.domain)
          if (data.verification) {
            const _verification = genralVerification
            for (let v of data.verification) {
              _verification.push({
                name: "_vercel",
                type: v.type,
                value: v.value,
              } as IVerification)
            }
            setVerification(_verification)
          }
        } else {
          setInputDomain(null)
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className='w-full'>
              <input
                value={inputDomain ?? ""}
                onChange={handleInputChange}
                placeholder='example.com'
                className='px-4 py-2 rounded border border-gray-400 w-full '
              />
              {inputError && (
                <p className='text-sm text-neutral-red h-2'>
                  Invalid domain. Add only top level domain
                </p>
              )}
            </div>
          )}
          <button
            disabled={loading || currentDomain === inputDomain || inputError}
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
            After adding domain you can compy these values and add them{" "}
          </span>
          <span className='block sm:inline'>
            to your domain/DNS provider. After adding the values you can{" "}
          </span>
          <span className='block sm:inline'>
            use your domain to view your portfolio. It might take upto{" "}
          </span>
          <span className='block sm:inline'>
            48 hours depening upon your domain provider.{" "}
          </span>
        </p>
        <div className='flex text-sm bg-gray-300 p-6 overflow-x-scroll whitespace-nowrap'>
          <div className='w-1/5 px-4 min-w-[30px]'>
            <h5 className='font-semibold mb-4'>Type</h5>
            {verification.map((v, i) => {
              return <p key={i}>{v.type}</p>
            })}
          </div>
          <div className='w-1/5 px-4 min-w-[30px]'>
            <h5 className='font-semibold mb-4'>Name</h5>
            {verification.map((v, i) => {
              return <p key={i}>{v.name}</p>
            })}
          </div>
          <div className='w-3/5 px-4 min-w-[120px]'>
            <h5 className='font-semibold mb-4'>Value</h5>
            {verification.map((v, i) => {
              return <p key={i}>{v.value}</p>
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
