import { useState } from "react"

import { ISite, ISiteUpdates } from "@/app/utils/interfaces"
import HttpStatus from "@/constants/http_status"
import { parseSiteDataFromJSON } from "@/app/utils/functions"

export default function LinksAndSocial({
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
  siteInfo,
  valuesChanged,
}: ISiteUpdates) {
  const [links, setLinks] = useState<ISite>({
    linkedin_url: siteInfo?.linkedin_url || "",
    resume_link: siteInfo?.resume_link || "",
    instagram_url: siteInfo?.instagram_url || "",
    twitter_url: siteInfo?.twitter_url || "",
    youtube_url: siteInfo?.youtube_url || "",
    medium_url: siteInfo?.medium_url || "",
    github_url: siteInfo?.github_url || "",
    dribbble_url: siteInfo?.dribbble_url || "",
    hire_me: siteInfo?.hire_me || "",
    publication: siteInfo?.publication || "",
  } as ISite)

  function resetChanges() {
    setLinks({
      linkedin_url: siteInfo?.linkedin_url || "",
      resume_link: siteInfo?.resume_link || "",
      instagram_url: siteInfo?.instagram_url || "",
      twitter_url: siteInfo?.twitter_url || "",
      youtube_url: siteInfo?.youtube_url || "",
      medium_url: siteInfo?.medium_url || "",
      github_url: siteInfo?.github_url || "",
      dribbble_url: siteInfo?.dribbble_url || "",
      hire_me: siteInfo?.hire_me || "",
      publication: siteInfo?.publication || "",
    } as ISite)
    setValuesChanged(false)
  }

  async function saveChanges() {
    setIsLoading(true)
    console.log("site data", links)
    const res = await fetch("/api/site/links-and-social", {
      method: "PUT",
      body: JSON.stringify(links),
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
        <div className='max-w-medium-website '>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Resume Link</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Upload your resume in Google Drive
                </span>
                <span className='block md:inline'>
                  and add the link here.{" "}
                  <span className='font-medium text-neutral-dark'>
                    (recommened)
                  </span>
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://drive.google.com/file/d/1XXXXXX/view?usp=sharing'
                value={links.resume_link}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.resume_link = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Linkedin URL</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Add your LinkedIn profile link here. Used
                </span>
                <span className='block md:inline'>
                  for navigating users to connect with you
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://in.linkedin.com/user'
                value={links.linkedin_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.linkedin_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Instagram</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Add your instagram if you want users on
                </span>
                <span className='block md:inline'>your IG profile</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://instagram.com/raiadi2008'
                value={links.instagram_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.instagram_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Twitter</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Add your twitter if you want to engage
                </span>
                <span className='block md:inline'>users on your twitter</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://facebook.com/username'
                value={links.twitter_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.twitter_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Youtube</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>Add your youtube here</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://www.youtube.com/channel'
                value={links.youtube_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.youtube_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Medium</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Do you write on medium. Add your
                </span>
                <span className='block md:inline'>
                  medium profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://www.medium.com/raiadi'
                value={links.medium_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.medium_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Github</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Are you contributing to open source.
                </span>
                <span className='block md:inline'>
                  Add your github profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://www.github.com/raiadi2008'
                value={links.github_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.github_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Dribbble</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Are you a dribbble user. Add your
                </span>
                <span className='block md:inline'>
                  dribbble profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://www.dribbble.com/raiasdfws'
                value={links.dribbble_url}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.dribbble_url = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Hire Me</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  This is where your potential employers will
                </span>
                <span className='block md:inline'>
                  connect with you. By default its Linkedin.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://bit.ly/sml'
                value={links.hire_me}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.hire_me = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 md:flex-col md:items-start'>
            <div>
              <label>Publications</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block md:inline'>
                  Do you have a blog or a publication. Let your
                </span>
                <span className='block md:inline'>
                  portfolio visitors know about it.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left md:mt-2 md:w-80'
                placeholder='https://www.blog.com'
                value={links.publication}
                onChange={(e) => {
                  const _links = { ...links }
                  _links.publication = e.target.value
                  setLinks(_links)
                  setValuesChanged(true)
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
            <button
              onClick={resetChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveChanges}
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
