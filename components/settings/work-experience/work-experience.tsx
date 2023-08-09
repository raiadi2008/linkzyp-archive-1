import { useEffect, useState } from "react"

import { IExperience, ISiteUpdates } from "@/utils/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  removeItemAtIndex,
} from "@/utils/functions"

function compareExperiences(
  currentWE: IExperience[],
  initialWE: IExperience[]
): boolean {
  if (currentWE.length !== initialWE.length) {
    return true
  }

  for (let i = 0; i < currentWE.length; i++) {
    const current = currentWE[i]
    const initial = initialWE[i]

    if (
      current.company !== initial.company ||
      current.title !== initial.title ||
      current.description !== initial.description ||
      current.starts_at !== initial.starts_at ||
      current.ends_at !== initial.ends_at ||
      current.location !== initial.location ||
      current.company_linkedin_profile_url !==
        initial.company_linkedin_profile_url ||
      current.logo !== initial.logo
    ) {
      return true
    }
  }

  return false
}

export default function WorkExperience({ siteInfo }: ISiteUpdates) {
  const [dataChanged, setDataChanged] = useState(false)
  const [experiences, setExperiences] = useState<IExperience[]>(
    siteInfo.experiences.map((value) => {
      return {
        company: value.company,
        title: value.title,
        description: value.description,
        starts_at: value.starts_at,
        ends_at: value.ends_at,
        location: value.location,
        company_linkedin_profile_url: value.company_linkedin_profile_url,
        logo: value.logo,
      }
    })
  )

  useEffect(() => {
    if (compareExperiences(experiences, siteInfo.experiences)) {
      setDataChanged(true)
    } else {
      setDataChanged(false)
    }
  }, [experiences])

  function discardWorkExperienceChanges() {
    setExperiences(siteInfo.experiences)
    setDataChanged(false)
  }

  function saveWorkExperienceChanges() {}

  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
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
                    onChange={(e) => {
                      const workExperience = [...experiences]
                      workExperience[index].starts_at =
                        convert_YYYY_MM_DD_toDate(e.target.value)
                      setExperiences(workExperience)
                    }}
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
                    onChange={(e) => {
                      const workExperience = [...experiences]
                      workExperience[index].ends_at = convert_YYYY_MM_DD_toDate(
                        e.target.value
                      )
                      setExperiences(workExperience)
                    }}
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
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              onClick={discardWorkExperienceChanges}
              disabled={!dataChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveWorkExperienceChanges}
              disabled={!dataChanged}
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
