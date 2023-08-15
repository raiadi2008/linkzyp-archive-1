export default function WorkExperience() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium-website'>
          <div className='my-12 relative pb-14'>
            <label className='font-sm text-gray-600 px-2' htmlFor='company'>
              Compnay Name<span className='text-dark-red'>*</span>
            </label>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>

            <label className='font-sm text-gray-600 px-2' htmlFor='title'>
              Title<span className='text-dark-red'>*</span>
            </label>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>

            <label className='font-sm text-gray-600 px-2'>
              Job Description
            </label>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>

            <label className='font-sm text-gray-600 px-2' htmlFor='company'>
              Company Profile Linkedin Url
            </label>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>

            <div className='flex gap-x-6 items-center xs:flex-col'>
              <div className='w-full'>
                <label className='font-sm text-gray-600 px-2'>
                  Start Date<span className='text-dark-red'>*</span>
                </label>
                <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>
              </div>
              <div className='w-full'>
                <label className='font-sm text-gray-600 px-2'>
                  End Date<span className='text-dark-red'>*</span>
                </label>
                <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>
              </div>
            </div>
            <button
              className='absolute bottom-2 right-0 text-neutral-red border rounded p-2 border-neutral-red'
              disabled={true}
            >
              delete experience
            </button>
          </div>

          <button
            className='px-5 py-2 border border-gray-100 text-gray-100 rounded w-full mb-2 resize-none'
            disabled={true}
          >
            + Add Another Experience
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
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
