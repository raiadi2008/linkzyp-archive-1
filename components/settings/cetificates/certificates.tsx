import { useEffect, useState } from "react"

import { ICertificate, ISite, ISiteUpdates } from "@/types/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  removeItemAtIndex,
} from "@/utils/functions"

export default function Certificates({
  siteInfo,
  updateSiteInfo,
}: ISiteUpdates) {
  const [certificates, setCertificates] = useState<ICertificate[]>(
    siteInfo.certificates
  )

  useEffect(() => {
    updateSiteInfo({ ...siteInfo, certificates: certificates } as ISite)
  }, [certificates])

  return (
    <div className='max-w-medium-website'>
      {certificates.map((value, index) => {
        return (
          <div key={index} className='my-12 relative pb-14'>
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='School Name for eg. Harvard University'
              value={value.name}
              onChange={(e) => {
                const edu = [...certificates]
                edu[index].name = e.target.value
                setCertificates(edu)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Degree Name for eg. Bachelor of Science'
              value={value.authority}
              onChange={(e) => {
                const edu = [...certificates]
                edu[index].authority = e.target.value
                setCertificates(edu)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Field of study for eg. Computer Science'
              value={value.url}
              onChange={(e) => {
                const edu = [...certificates]
                edu[index].url = e.target.value
                setCertificates(edu)
              }}
            />

            <button
              className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
              onClick={() => {
                const edu = [...certificates]
                removeItemAtIndex(edu, index)
                setCertificates(edu)
              }}
            >
              remove certificates
            </button>
          </div>
        )
      })}
      <button
        className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
        onClick={() => {
          const edu = [...certificates]
          edu.push({} as ICertificate)
          setCertificates(edu)
        }}
      >
        + Add Another Education
      </button>
    </div>
  )
}
