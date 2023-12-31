import { useEffect, useState } from "react"

import { IEducation, ISiteUpdates } from "@/app/utils/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  parseSiteDataFromJSON,
  removeItemAtIndex,
} from "@/app/utils/functions"
import HttpStatus from "@/constants/http_status"

interface EducationError {
  school: boolean
  degree_name: boolean
  field_of_study: boolean
  starts_at: boolean
  ends_at: boolean
}

function compareEducation(a: IEducation[], b: IEducation[]): boolean {
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].degree_name !== b[i].degree_name ||
      a[i].ends_at !== b[i].ends_at ||
      a[i].field_of_study !== b[i].field_of_study ||
      a[i].logo !== b[i].logo ||
      a[i].school !== b[i].school ||
      a[i].starts_at !== b[i].starts_at
    )
      return true
  }

  return false
}

export default function Education({
  siteInfo,
  valuesChanged,
  setIsLoading,
  setValuesChanged,
  setSiteInfo,
}: ISiteUpdates) {
  const [education, setEducation] = useState<IEducation[]>(
    siteInfo.education!.map((value) => {
      return {
        school: value.school,
        degree_name: value.degree_name,
        field_of_study: value.field_of_study,
        starts_at: value.starts_at,
        ends_at: value.ends_at,
        logo: value.logo,
      }
    })
  )
  const [errors, setErrors] = useState<EducationError[]>(
    siteInfo.education!.map((values) => {
      return {
        school: false,
        degree_name: false,
        field_of_study: false,
        starts_at: false,
        ends_at: false,
      } as EducationError
    })
  )

  useEffect(() => {
    validateEducationData()
    if (compareEducation(education, siteInfo.education!)) {
      setValuesChanged(true)
    } else {
      setValuesChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [education])

  function validateEducationData() {
    const _error = education.map((value) => {
      return {
        school: !value.school || value.school.length === 0,
        degree_name: !value.degree_name || value.degree_name.length === 0,
        field_of_study:
          !value.field_of_study || value.field_of_study.length === 0,
        starts_at: !value.starts_at,
        ends_at: !value.ends_at,
      } as EducationError
    })
    setErrors(_error)
  }

  function discardEducationChanges() {
    setEducation(
      siteInfo.education!.map((value) => {
        return {
          school: value.school,
          degree_name: value.degree_name,
          field_of_study: value.field_of_study,
          starts_at: value.starts_at,
          ends_at: value.ends_at,
          logo: value.logo,
        }
      })
    )
    setValuesChanged(false)
  }
  async function saveEducationChanges() {
    validateEducationData()
    for (let ee of errors) {
      if (
        ee.degree_name ||
        ee.ends_at ||
        ee.field_of_study ||
        ee.school ||
        ee.starts_at
      ) {
        return
      }
    }
    setIsLoading(true)
    const res = await fetch("/api/site/education", {
      method: "PUT",
      body: JSON.stringify(education),
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
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium'>
          {education.map((edu, index) => {
            return (
              <div key={index} className='my-12 relative pb-14'>
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  School Name<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border rounded w-full mb-4 ${
                    errors[index]?.school ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='School Name for eg. Harvard University'
                  value={edu.school}
                  onChange={(e) => {
                    const _edu = [...education]
                    _edu[index].school = e.target.value
                    setEducation(_edu)
                  }}
                />
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Degree Name<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border rounded w-full mb-4 ${
                    errors[index]?.degree_name ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='Degree Name for eg. Bachelor of Science'
                  value={edu.degree_name}
                  onChange={(e) => {
                    const _edu = [...education]
                    _edu[index].degree_name = e.target.value
                    setEducation(_edu)
                  }}
                />
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Field of Study<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border rounded w-full mb-4 ${
                    errors[index]?.field_of_study ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='Field of study for eg. Computer Science'
                  value={edu.field_of_study}
                  onChange={(e) => {
                    const _edu = [...education]
                    _edu[index].field_of_study = e.target.value
                    setEducation(_edu)
                  }}
                />
                <div className='flex gap-x-6 items-center mb-4 sm:flex-col'>
                  <div className='w-full'>
                    <label
                      className='font-sm text-gray-600 px-2'
                      htmlFor='company'
                    >
                      Start Date<span className='text-dark-red'>*</span>
                    </label>
                    <input
                      className={`px-5 py-2 outline-none border border-gray-300 rounded w-full resize-none ${
                        errors[index]?.starts_at ?? false
                          ? "border-neutral-red"
                          : "border-gray-300"
                      } sm:mb-4`}
                      type='date'
                      value={
                        edu.starts_at
                          ? formatDateAs_YYYY_MM_DD(edu.starts_at)
                          : ""
                      }
                      onChange={(e) => {
                        const _edu = [...education]
                        _edu[index].starts_at = convert_YYYY_MM_DD_toDate(
                          e.target.value
                        )
                        setEducation(_edu)
                      }}
                    />
                  </div>
                  <div className='w-full'>
                    <label
                      className='font-sm text-gray-600 px-2'
                      htmlFor='company'
                    >
                      End Date (expected)
                      <span className='text-dark-red'>*</span>
                    </label>
                    <input
                      className={`px-5 py-2 outline-none border border-gray-300 w-full rounded resize-none ${
                        errors[index]?.ends_at ?? false
                          ? "border-neutral-red"
                          : "border-gray-300"
                      }`}
                      type='date'
                      value={
                        edu.ends_at ? formatDateAs_YYYY_MM_DD(edu.ends_at) : ""
                      }
                      onChange={(e) => {
                        const _edu = [...education]
                        _edu[index].ends_at = convert_YYYY_MM_DD_toDate(
                          e.target.value
                        )
                        setEducation(_edu)
                      }}
                    />
                  </div>
                </div>
                <button
                  className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
                  onClick={() => {
                    const _edu = [...education]
                    removeItemAtIndex(_edu, index)
                    setEducation(_edu)
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
              const _edu = [...education]
              _edu.push({} as IEducation)
              setEducation(_edu)
            }}
          >
            + Add Another Education
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium py-6 flex gap-x-6 justify-end'>
            <button
              onClick={discardEducationChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveEducationChanges}
              disabled={!valuesChanged}
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
