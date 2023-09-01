"use client"

import Link from "next/link"

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Page() {
  return (
    <main className='w-fit mx-auto mt-24'>
      <h1 className='text-xl font-semibold text-black mb-4'>
        You have cancelled your LINKZYP PREMIUM subscription.
      </h1>
      <div className='flex justify-center'>
        <p className='max-w-sm text-center text-xs text-gray-600'>
          You will have access to premium till then end of billion cycle. After
          that your card won&apos;t be charged further
        </p>
      </div>
      <div className='text-center mt-12'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          color='red'
          className='w-24 h-24'
        />
      </div>
      <div className='flex gap-x-12 mt-12 justify-center'>
        <Link href='/app/settings?tab=profile'>
          <button className='px-6 py-3 rounded-md text-yellow-600 font-semibold bg-black'>
            Go To Settings
          </button>
        </Link>
      </div>
    </main>
  )
}
