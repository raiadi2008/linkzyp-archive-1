import { useEffect, useState } from "react"

import { IExperience, ISiteUpdates } from "@/utils/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  removeItemAtIndex,
} from "@/utils/functions"

export default function WorkExperienceLoading() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
        <div className='max-w-medium-website'>
          <div className='my-12 relative pb-14'>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='flex gap-x-6 items-center mb-4'>
              <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>
              <p>to</p>
              <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>
            </div>
            <button className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'>
              delete experience
            </button>
          </div>

          <button
            disabled={true}
            className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
          >
            + Add Another Experience
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
