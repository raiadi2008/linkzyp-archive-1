import { useEffect, useState } from "react"

import { IProject, ISite, ISiteUpdates } from "@/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/utils/functions"
import HttpStatus from "@/constants/http_status"

function compareProjects(a: IProject[], b: IProject[]): boolean {
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].title !== b[i].title ||
      a[i].description !== b[i].description ||
      a[i].url !== b[i].url
    )
      return true
  }
  return false
}

export default function Projects({
  siteInfo,
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
  valuesChanged,
}: ISiteUpdates) {
  const [projects, setProjects] = useState<IProject[]>(
    siteInfo.projects!.map((value) => {
      return {
        title: value.title,
        description: value.description,
        url: value.url,
      }
    })
  )
  const [errors, setErrors] = useState<boolean[]>(
    siteInfo.projects!.map(() => false)
  )

  useEffect(() => {
    validateInput()
    if (compareProjects(projects, siteInfo.projects!)) {
      setValuesChanged(true)
    } else {
      setValuesChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  function validateInput() {
    const _error = projects.map((value) => !value.title)
    setErrors(_error)
  }

  function discardProjectChanges() {
    setProjects(
      siteInfo.projects!.map((value) => {
        return {
          title: value.title,
          description: value.description,
          url: value.url,
        }
      })
    )
    setValuesChanged(false)
  }

  async function saveProjectChanges() {
    validateInput()
    if (errors.some((value) => value === true)) {
      return
    }
    setIsLoading(true)

    const res = await fetch("/api/site/projects", {
      method: "PUT",
      body: JSON.stringify(projects),
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
              } as IProject)
              setProjects(_projects)
            }}
          >
            + Add Another Project
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              onClick={discardProjectChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveProjectChanges}
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
