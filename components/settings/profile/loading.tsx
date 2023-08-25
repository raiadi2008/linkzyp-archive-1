"use client"

import HttpStatus from "@/constants/http_status"
import useDebouncer from "@/hooks/useDebouncer"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import { ISite, ISiteUpdates } from "@/app/utils/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfileSettings() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium '>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>First Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Value is used to display your first name
                </span>
                <span className='block sm:inline'>
                  on the portfolio site as required
                </span>
              </p>
            </div>
            <div>
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-72 sm:mt-3'></div>
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Last Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Value is used to display your last name
                </span>
                <span className='block sm:inline'>
                  on the portfolio site as required
                </span>
              </p>
            </div>
            <div>
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-72 sm:mt-3'></div>
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Occupation</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Will be used to create a tag-line for the
                </span>
                <span className='block sm:inline'>
                  header. eg Hi, I am content writer
                </span>
              </p>
            </div>
            <div>
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-72 sm:mt-3'></div>
            </div>
          </div>
          <div className='flex justify-between items-center mb-2 sm:flex-col sm:items-start'>
            <div>
              <label>Username</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Won&apos;t be visible on site. Username will make
                </span>
                <span className='block sm:inline'>
                  the url where your portfolio is accessible.
                </span>
              </p>
            </div>
            <div>
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-72 sm:mt-3'></div>
            </div>
          </div>
          <div className='flex gap-x-12 sm:mt-6'>
            <div className='animate-pulse rounded  bg-slate-200 h-4 w-28'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-4 w-28'></div>
          </div>
        </div>
      </section>

      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium py-6 flex gap-x-6 justify-end'>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
