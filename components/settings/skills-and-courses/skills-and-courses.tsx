import { ISite, ISiteUpdates } from "@/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/utils/functions"
import { useEffect, useState } from "react"
import HttpStatus from "@/constants/http_status"

function compareStringArray(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return true
  }
  return false
}

export default function SkillsAndCourses({
  siteInfo,
  valuesChanged,
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
}: ISiteUpdates) {
  const [skills, setSkills] = useState<string[]>([...siteInfo.skills!])
  const [newSkill, setNewSkill] = useState<string>("")
  const [newCourse, setNewCourse] = useState<string>("")
  const [courses, setCourses] = useState<string[]>([...siteInfo.courses!])

  useEffect(() => {
    if (
      compareStringArray(siteInfo.skills!, skills) ||
      compareStringArray(siteInfo.courses!, courses)
    ) {
      setValuesChanged(true)
    } else {
      setValuesChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, courses])

  function discardSkillAndCourseChanges() {
    setSkills([...siteInfo.skills!])
    setCourses([...siteInfo.courses!])
    setValuesChanged(false)
  }

  async function saveSkillAndCourseChanges() {
    setIsLoading(true)
    const res = await fetch("/api/site/skills-and-courses", {
      method: "PUT",
      body: JSON.stringify({ skills: skills, courses: courses }),
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
        <div className='max-w-medium-website overflow-hidden'>
          <h2 className='text-2xl font-semibold mb-4'>Your Skills</h2>
          <div className='flex flex-wrap gap-2 p-4 border border-neutral-200 rounded mb-4'>
            {skills.map((value, index) => (
              <div
                key={index}
                className='px-4 py-2 bg-blue-50 rounded-full flex items-center'
              >
                <p>{value}</p>
                <button
                  onClick={(e) => {
                    const skillsTemp = [...skills]
                    removeItemAtIndex(skillsTemp, index)
                    setSkills(skillsTemp)
                  }}
                  className='ml-3 text-dark-red'
                >
                  x
                </button>
              </div>
            ))}
            <div className='mt-8 flex w-full  gap-x-12 sm:gap-x-4 xs:flex-col'>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full xs:mb-2'
                type='text'
                value={newSkill}
                placeholder='Add new skill eg. Content Writing'
                onChange={(e) => {
                  setNewSkill(e.target.value)
                }}
              />
              <button
                className='text-primary px-12 border border-primary rounded whitespace-nowrap sm:px-4 xs:py-2'
                onClick={(e) => {
                  if (newSkill.trim().length > 0) {
                    setSkills([...skills, newSkill])
                    setNewSkill("")
                  }
                }}
              >
                Add Skill
              </button>
            </div>
          </div>
          <h2 className='text-2xl font-semibold mb-4 mt-16'>Your Courses</h2>
          <div className='flex flex-wrap gap-2 p-4 border border-neutral-200 rounded mb-4'>
            {courses.map((value, index) => (
              <div
                key={index}
                className='px-4 py-2 bg-blue-50 rounded-full flex items-center'
              >
                <p>{value}</p>
                <button
                  onClick={(e) => {
                    const coursesTemp = [...courses]
                    removeItemAtIndex(coursesTemp, index)
                    setCourses(coursesTemp)
                  }}
                  className='ml-3 text-dark-red'
                >
                  x
                </button>
              </div>
            ))}
            <div className='mt-8 flex w-full  gap-x-12 sm:gap-x-4 xs:flex-col '>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full xs:mb-2'
                type='text'
                value={newCourse}
                placeholder='Add new course eg. Basic Computing'
                onChange={(e) => {
                  setNewCourse(e.target.value)
                }}
              />
              <button
                className='text-primary px-12 border border-primary rounded whitespace-nowrap sm:px-4 xs:py-2'
                onClick={(e) => {
                  if (newCourse.trim().length > 0) {
                    setCourses([...courses, newCourse])
                    setNewCourse("")
                  }
                }}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
            <button
              onClick={discardSkillAndCourseChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveSkillAndCourseChanges}
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
