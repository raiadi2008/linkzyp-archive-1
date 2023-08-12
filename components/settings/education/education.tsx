import { useEffect, useState } from "react"

import { IEducation, ISiteUpdates } from "@/utils/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  parseSiteDataFromJSON,
  removeItemAtIndex,
} from "@/utils/functions"
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
    const _error = siteInfo.education!.map((value) => {
      return {
        school: !value.school || value.school.length === 0,
        degree_name: !value.degree_name || value.degree_name.length === 0,
        field_of_study:
          !value.field_of_study || value.field_of_study.length === 0,
        starts_at: !value.starts_at,
        ends_at: !value.starts_at,
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
        ee.school
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
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
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
                      value.ends_at
                        ? formatDateAs_YYYY_MM_DD(value.ends_at)
                        : ""
                    }
                    onChange={(e) => {
                      const edu = [...education]
                      edu[index].ends_at = convert_YYYY_MM_DD_toDate(
                        e.target.value
                      )
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
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              onClick={discardEducationChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveEducationChanges}
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
