"use client"

import Link from "next/link"

export default function ProfileSettingsLoading() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
        <div className='max-w-medium-website'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>First Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Value is used to display your first name
                </span>
                <span className='block'>on the portfolio site as required</span>
              </p>
            </div>
            <div className='animate-pulse rounded  bg-slate-200 h-8 w-72'></div>
          </div>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>Last Name</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Value is used to display your last name
                </span>
                <span className='block'>on the portfolio site as required</span>
              </p>
            </div>

            <div className='animate-pulse rounded  bg-slate-200 h-8 w-72'></div>
          </div>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <label>Occupation</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Will be used to create a tag-line for the
                </span>
                <span className='block'>
                  header. eg Hi, I am content writer
                </span>
              </p>
            </div>
            <div className='animate-pulse rounded  bg-slate-200 h-8 w-72'></div>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <div>
              <label>Username</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block'>
                  Won't be visible on site. Username will make
                </span>
                <span className='block'>
                  the url where your portfolio is accessible.
                </span>
              </p>
            </div>
            <div className='animate-pulse rounded  bg-slate-200 h-8 w-72'></div>
          </div>
          <div className='flex gap-x-12'>
            <div className='animate-pulse rounded  bg-slate-200 h-4 w-28'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-4 w-28'></div>
          </div>
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
