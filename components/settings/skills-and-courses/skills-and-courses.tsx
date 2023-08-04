import { ISite, ISiteUpdates } from "@/types/interfaces"
import { removeItemAtIndex } from "@/utils/functions"
import { useEffect, useState } from "react"

export default function SkillsAndCourses({
  siteInfo,
  updateSiteInfo,
}: ISiteUpdates) {
  const [skills, setSkills] = useState<string[]>(siteInfo.skills)
  const [newSkill, setNewSkill] = useState<string>("")
  const [newCourse, setNewCourse] = useState<string>("")
  const [courses, setCourses] = useState<string[]>(siteInfo.courses)

  useEffect(() => {
    updateSiteInfo({ ...siteInfo, skills: skills, courses: courses } as ISite)
  }, [skills, courses])

  return (
    <div className='max-w-medium-website overflow-hidden'>
      <h2 className='text-2xl font-semibold mb-4'>Your Skills</h2>
      <div className='flex flex-wrap gap-2 p-4 border border-neutral-200 rounded mb-4'>
        {skills.map((value, index) => (
          <div className='px-4 py-2 bg-blue-50 rounded-full flex items-center'>
            <p key={index}>{value}</p>
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
        <div className='mt-8 flex w-full  gap-x-12'>
          <input
            className='px-5 py-2 outline-none border border-gray-300 rounded w-full'
            type='text'
            value={newSkill}
            placeholder='Add new skill eg. Content Writing'
            onChange={(e) => {
              setNewSkill(e.target.value)
            }}
          />
          <button
            className='text-primary px-12 border border-primary rounded whitespace-nowrap '
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
          <div className='px-4 py-2 bg-blue-50 rounded-full flex items-center'>
            <p key={index}>{value}</p>
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
        <div className='mt-8 flex w-full  gap-x-12'>
          <input
            className='px-5 py-2 outline-none border border-gray-300 rounded w-full'
            type='text'
            value={newCourse}
            placeholder='Add new skill eg. Content Writing'
            onChange={(e) => {
              setNewCourse(e.target.value)
            }}
          />
          <button
            className='text-primary px-12 border border-primary rounded whitespace-nowrap '
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
  )
}
