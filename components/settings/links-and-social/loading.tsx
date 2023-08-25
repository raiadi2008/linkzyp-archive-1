export default function LinksAndSocialLoading() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium '>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
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
              <div className='animate-pulse rounded  bg-slate-200 h-8 w-96 sm:text-left md:mt-2 md:w-80'></div>
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium py-6 flex gap-x-6 justify-end'>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              disabled={true}
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
