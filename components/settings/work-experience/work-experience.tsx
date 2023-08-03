import { useEffect, useState } from "react"

import { IExperience, ISite, ISiteUpdates } from "@/types/interfaces"
import { formatDateAs_YYYY_MM_DD, removeItemAtIndex } from "@/utils/functions"

export default function WorkExperience({
  siteInfo,
  updateSiteInfo,
}: ISiteUpdates) {
  const [experiences, setExperiences] = useState<IExperience[]>(
    siteInfo.experiences
  )

  useEffect(() => {
    updateSiteInfo({ ...siteInfo, experiences: experiences } as ISite)
  }, [experiences])

  return (
    <div className='max-w-medium-website'>
      {experiences.map((experience, index) => {
        return (
          <div key={index} className='my-12 relative pb-14'>
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Company Name eg. Google'
              value={experience.company}
              onChange={(e) => {
                const workExperience = [...experiences]
                workExperience[index].company = e.target.value
                setExperiences(workExperience)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Job Title eg. Software Engineer'
              value={experience.title}
              onChange={(e) => {
                const workExperience = [...experiences]
                workExperience[index].title = e.target.value
                setExperiences(workExperience)
              }}
            />
            <textarea
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
              rows={4}
              value={experience.description ?? ""}
              placeholder='Add a job description. What you did at the job or what were your responsibility'
              onChange={(e) => {
                const workExperience = [...experiences]
                workExperience[index].description = e.target.value
                setExperiences(workExperience)
              }}
            />
            <div className='flex gap-x-6 items-center'>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
                type='date'
                value={
                  experience.starts_at
                    ? formatDateAs_YYYY_MM_DD(experience.starts_at)
                    : ""
                }
                onChange={(e) => {}}
              />
              <p>to</p>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
                type='date'
                value={
                  experience.ends_at
                    ? formatDateAs_YYYY_MM_DD(experience.ends_at)
                    : ""
                }
              />
            </div>
            <button
              className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
              onClick={() => {
                const workExperience = [...experiences]
                removeItemAtIndex(workExperience, index)
                setExperiences(workExperience)
              }}
            >
              delete experience
            </button>
          </div>
        )
      })}
      <button
        className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
        onClick={() => {
          const workExperience = [...experiences]
          workExperience.push({} as IExperience)
          setExperiences(workExperience)
        }}
      >
        + Add Another Experience
      </button>
    </div>
  )
}
