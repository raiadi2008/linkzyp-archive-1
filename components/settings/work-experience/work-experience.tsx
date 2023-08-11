import { useEffect, useState } from "react"

import { IExperience, ISiteUpdates } from "@/utils/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  parseDateString,
  parseSiteDataFromJSON,
  removeItemAtIndex,
} from "@/utils/functions"
import HttpStatus from "@/constants/http_status"

interface WorkExperienceError {
  company: string | null
  title: string | null
  starts_at: string | null
  ends_at: string | null
}

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

export default function WorkExperience({
  siteInfo,
  valuesChanged,
  setValuesChanged,
  setSiteInfo,
  setIsLoading,
}: ISiteUpdates) {
  const [experiences, setExperiences] = useState<IExperience[]>(
    siteInfo.experiences!.map((value) => {
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
  const [experiencesError, setExperiencesError] = useState<
    WorkExperienceError[]
  >(
    siteInfo.experiences!.map((value) => {
      return {
        company: null,
        ends_at: null,
        starts_at: null,
        title: null,
      }
    })
  )

  useEffect(() => {
    validateInputs()
    if (compareExperiences(experiences, siteInfo.experiences!)) {
      setValuesChanged(true)
    } else {
      setValuesChanged(false)
    }
  }, [experiences])

  function validateInputs() {
    const _experiencesError = experiences.map((value, index) => {
      return {
        company:
          !value.company || value.company.length === 0
            ? "Company name cannot be empty"
            : null,
        title:
          !value.title || value.title.length === 0
            ? "Job title cannot be empty"
            : null,
        starts_at: !value.starts_at ? "Start date cannot be empty" : null,
        ends_at:
          !value.currently_working && !value.ends_at
            ? "End date cannot be empty"
            : null,
      } as WorkExperienceError
    })
    setExperiencesError(_experiencesError)
  }

  function discardWorkExperienceChanges() {
    setExperiences(
      siteInfo.experiences!.map((value) => {
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
    setValuesChanged(false)
  }

  async function saveWorkExperienceChanges() {
    validateInputs()
    for (let ee of experiencesError) {
      if (ee.company || ee.title || ee.starts_at || ee.ends_at) {
        return
      }
    }
    setIsLoading(true)
    const res = await fetch("/api/site/experience", {
      method: "PUT",
      body: JSON.stringify(experiences),
    })
    if (res.ok && res.status === HttpStatus.SUCCESS) {
      const data = await res.json()
      const parsedData = parseSiteDataFromJSON(data)
      setSiteInfo(parsedData)
      setValuesChanged(false)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
        <div className='max-w-medium-website'>
          {experiences.map((experience, index) => {
            return (
              <div key={index} className='my-12 relative pb-14'>
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Compnay Name<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border ${
                    experiencesError[index] && experiencesError[index].company
                      ? "border-neutral-red"
                      : "border-gray-300"
                  } rounded w-full mb-4`}
                  type='text'
                  placeholder='Company Name eg. Google'
                  value={experience.company}
                  onChange={(e) => {
                    const workExperience = [...experiences]
                    workExperience[index].company = e.target.value
                    setExperiences(workExperience)
                  }}
                />
                <label className='font-sm text-gray-600 px-2' htmlFor='title'>
                  Title<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border ${
                    experiencesError[index] && experiencesError[index].title
                      ? "border-neutral-red"
                      : "border-gray-300"
                  } rounded w-full mb-4`}
                  type='text'
                  placeholder='Job Title eg. Software Engineer'
                  value={experience.title}
                  onChange={(e) => {
                    const workExperience = [...experiences]
                    workExperience[index].title = e.target.value
                    setExperiences(workExperience)
                  }}
                />
                <label className='font-sm text-gray-600 px-2'>
                  Job Description
                </label>
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
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Company Profile Linkedin Url
                </label>
                <input
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-4'
                  type='text'
                  placeholder='Company Name eg. Google'
                  value={experience.company_linkedin_profile_url}
                  onChange={(e) => {
                    const workExperience = [...experiences]
                    workExperience[index].company_linkedin_profile_url =
                      e.target.value
                    setExperiences(workExperience)
                  }}
                />
                <div className='flex gap-x-6 items-center'>
                  <div className='w-full'>
                    <label className='font-sm text-gray-600 px-2'>
                      Start Date<span className='text-dark-red'>*</span>
                    </label>
                    <input
                      className='px-5 py-2 outline-none border border-gray-300 rounded w-full  mb-2'
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
                  </div>
                  <div className='w-full'>
                    <label className='font-sm text-gray-600 px-2'>
                      End Date<span className='text-dark-red'>*</span>
                    </label>
                    <input
                      className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
                      type='date'
                      value={
                        experience.ends_at
                          ? formatDateAs_YYYY_MM_DD(experience.ends_at)
                          : ""
                      }
                      onChange={(e) => {
                        const workExperience = [...experiences]
                        workExperience[index].ends_at =
                          convert_YYYY_MM_DD_toDate(e.target.value)
                        setExperiences(workExperience)
                      }}
                    />
                  </div>
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
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveWorkExperienceChanges}
              disabled={!valuesChanged}
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
