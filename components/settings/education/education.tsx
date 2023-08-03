import { useEffect, useState } from "react"

import { IEducation, ISite, ISiteUpdates } from "@/types/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  removeItemAtIndex,
} from "@/utils/functions"

export default function Education({ siteInfo, updateSiteInfo }: ISiteUpdates) {
  const [education, setEducation] = useState<IEducation[]>(siteInfo.education)

  useEffect(() => {
    updateSiteInfo({ ...siteInfo, education: education } as ISite)
  }, [education])

  return (
    <div className='max-w-medium-website'>
      {education.map((value, index) => {
        return (
          <div key={index} className='my-12 relative pb-14'>
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='School Name for eg. Harvard University'
              value={value.school}
              onChange={(e) => {
                const edu = [...education]
                edu[index].school = e.target.value
                setEducation(edu)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Degree Name for eg. Bachelor of Science'
              value={value.degree_name}
              onChange={(e) => {
                const edu = [...education]
                edu[index].degree_name = e.target.value
                setEducation(edu)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Field of study for eg. Computer Science'
              value={value.field_of_study}
              onChange={(e) => {
                const edu = [...education]
                edu[index].field_of_study = e.target.value
                setEducation(edu)
              }}
            />
            <div className='flex gap-x-6 items-center'>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
                type='date'
                value={
                  value.starts_at
                    ? formatDateAs_YYYY_MM_DD(value.starts_at)
                    : ""
                }
                onChange={(e) => {
                  const edu = [...education]
                  edu[index].starts_at = convert_YYYY_MM_DD_toDate(
                    e.target.value
                  )
                  setEducation(edu)
                }}
              />
              <p>to</p>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
                type='date'
                value={
                  value.ends_at ? formatDateAs_YYYY_MM_DD(value.ends_at) : ""
                }
                onChange={(e) => {
                  const edu = [...education]
                  edu[index].ends_at = convert_YYYY_MM_DD_toDate(e.target.value)
                  setEducation(edu)
                }}
              />
            </div>
            <button
              className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
              onClick={() => {
                const edu = [...education]
                removeItemAtIndex(edu, index)
                setEducation(edu)
              }}
            >
              remove education
            </button>
          </div>
        )
      })}
      <button
        className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
        onClick={() => {
          const edu = [...education]
          edu.push({} as IEducation)
          setEducation(edu)
        }}
      >
        + Add Another Education
      </button>
    </div>
  )
}
