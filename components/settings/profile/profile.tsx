"use client"

import { ISite, ISiteUpdates } from "@/types/interfaces"
import Link from "next/link"
import { Dispatch, SetStateAction, use, useEffect, useState } from "react"

export default function ProfileSettings({
  siteInfo,
  updateSiteInfo,
}: ISiteUpdates) {
  const [firstName, setFirstName] = useState(siteInfo.first_name)
  const [lastName, setLastName] = useState(siteInfo.last_name)
  const [occupation, setOccupation] = useState(siteInfo.occupation)
  const [username, setUsername] = useState(siteInfo.username)

  useEffect(() => {
    updateSiteInfo({
      ...siteInfo,
      first_name: firstName,
      last_name: lastName,
      occupation: occupation,
      username: username,
    } as ISite)
  }, [firstName, lastName, occupation, username])

  return (
    <div className='max-w-medium-website'>
      <div className=''>
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
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
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
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <label>Occupation</label>
            <p className='text-gray-500 font-extralight text-sm'>
              <span className='block'>
                Will be used to create a tag-line for the
              </span>
              <span className='block'>header. eg Hi, I am content writer</span>
            </p>
          </div>
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
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
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex gap-x-12'>
          <Link href='https://linkedin.com' target='_blank'>
            <p className='text-gray-500 font-semibold text-sm'>
              Open Portfolio<span className='text-xs'>&#x2197;</span>
            </p>
          </Link>
          <p
            className='text-gray-500 font-semibold text-sm hover:cursor-pointer active:text-xs'
            onClick={() => navigator.clipboard.writeText("www.linkedin.com")}
          >
            Copy Portfolio Url
          </p>
        </div>
      </div>
    </div>
  )
}
