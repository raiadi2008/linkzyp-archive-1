import { useEffect, useState } from "react"

import { IProject, ISite, ISiteUpdates } from "@/types/interfaces"
import {
  convert_YYYY_MM_DD_toDate,
  formatDateAs_YYYY_MM_DD,
  removeItemAtIndex,
} from "@/utils/functions"

export default function Projects({ siteInfo, updateSiteInfo }: ISiteUpdates) {
  const [projects, setProjects] = useState<IProject[]>(siteInfo.projects)
  const now = new Date()
  useEffect(() => {
    updateSiteInfo({ ...siteInfo, projects: projects } as ISite)
  }, [projects])

  return (
    <div className='max-w-medium-website'>
      {projects.map((value, index) => {
        return (
          <div key={index} className='my-12 relative pb-14'>
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Project Title eg. My Awesome Project'
              value={value.title}
              onChange={(e) => {
                const _projects = [...projects]
                _projects[index].title = e.target.value
                setProjects(_projects)
              }}
            />
            <textarea
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
              rows={4}
              placeholder='Project Description eg. This is my awesome project. It does awesome things.'
              value={value.description}
              onChange={(e) => {
                const _projects = [...projects]
                _projects[index].description = e.target.value
                setProjects(_projects)
              }}
            />
            <input
              className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
              type='text'
              placeholder='Link to the project eg. https://github.com/user/repo'
              value={value.url}
              onChange={(e) => {
                const _projects = [...projects]
                _projects[index].url = e.target.value
                setProjects(_projects)
              }}
            />
            <button
              className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
              onClick={() => {
                const _projects = [...projects]
                removeItemAtIndex(_projects, index)
                setProjects(_projects)
              }}
            >
              remove project
            </button>
          </div>
        )
      })}
      <button
        className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
        onClick={() => {
          const _projects = [...projects]
          _projects.push({
            url: "",
            description: "",
            title: "",
            starts_at: now,
            ends_at: now,
          } as IProject)
          setProjects(_projects)
        }}
      >
        + Add Another Project
      </button>
    </div>
  )
}
