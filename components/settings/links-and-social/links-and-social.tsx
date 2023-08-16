import { useState } from "react"

import { ILinksAndSocial, ISiteUpdates } from "@/utils/interfaces"

interface LinksError {
  name: boolean
  url: boolean
  type: boolean
}

export default function LinksAndSocial({
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
  siteInfo,
  valuesChanged,
}: ISiteUpdates) {
  const [links, setLinks] = useState<ILinksAndSocial[]>(
    siteInfo.links_and_social!.map((value, index) => {
      return {
        name: value.name,
        url: value.url,
        type: value.type,
      } as ILinksAndSocial
    })
  )
  const [errors, setErrors] = useState<LinksError[]>(
    siteInfo.links_and_social!.map((v) => {
      return {
        name: false,
        url: false,
        type: false,
      }
    })
  )

  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium-website '>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Resume Link</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Upload your resume in Google Drive
                </span>
                <span className='block sm:inline'>
                  and add the link here.{" "}
                  <span className='font-medium text-neutral-dark'>
                    (recommened)
                  </span>
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://drive.google.com/file/d/1XXXXXX/view?usp=sharing'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Linkedin URL</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Add your LinkedIn profile link here. Used
                </span>
                <span className='block sm:inline'>
                  for navigating users to connect with you
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://in.linkedin.com/user'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Instagram</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Add your instagram if you want users on
                </span>
                <span className='block sm:inline'>your IG profile</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://instagram.com/raiadi2008'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Twitter</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Add your twitter if you want to engage
                </span>
                <span className='block sm:inline'>users on your twitter</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://facebook.com/raiadi2008'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Youtube</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>Add your youtube here</span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Medium</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Do you write on medium. Add your
                </span>
                <span className='block sm:inline'>
                  medium profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Github</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Are you contributing to open source.
                </span>
                <span className='block sm:inline'>
                  Add your github profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Dribble</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Are you a dribble user. Add your
                </span>
                <span className='block sm:inline'>
                  dribble profile url here.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Hire Me</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  This is where your potential employers will
                </span>
                <span className='block sm:inline'>
                  connect with you. By default its Linkedin.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
          <div className='flex items-center justify-between mb-8 sm:flex-col sm:items-start'>
            <div>
              <label>Publications</label>
              <p className='text-gray-500 font-extralight text-sm'>
                <span className='block sm:inline'>
                  Do you have a blog or a publication. Let your
                </span>
                <span className='block sm:inline'>
                  portfolio visitors know about it.
                </span>
              </p>
            </div>
            <div>
              <input
                className=' text-left outline-none py-1 px-4 rounded w-96  border border-gray-300 text-neutral-dark sm:text-left sm:mt-2'
                placeholder='https://www.youtube.com/raiasdfws'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
            <button
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
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
