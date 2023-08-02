import { ISite, ISiteUpdates } from "@/types/interfaces"
import { Dispatch, SetStateAction, useState } from "react"

export default function AccountSettings({
  siteInfo,
  updateSiteInfo,
}: ISiteUpdates) {
  const [firstName, setFirstName] = useState(siteInfo?.first_name ?? "")
  const [lastName, setLastName] = useState(siteInfo?.last_name ?? "")

  return (
    <div className='max-w-medium-website'>
      <div className='child:mb-4'>
        <div className='flex justify-between'>
          <label>First Name</label>
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={firstName}
            onChange={(e) => {
              siteInfo!.first_name = e.target.value
              updateSiteInfo(siteInfo)
            }}
          />
        </div>
        <div className='flex justify-between'>
          <label>Last Name</label>
          <input
            className='text-gray-500 text-right outline-none focus:border-b focus:text-neutral-dark focus:border-gray-300 py-1 px-2 focus:bg-gray-100 rounded w-72 focus:text-left'
            value={lastName}
            onChange={(e) => {
              siteInfo!.last_name = e.target.value
              updateSiteInfo(siteInfo)
            }}
          />
        </div>
      </div>
    </div>
  )
}
