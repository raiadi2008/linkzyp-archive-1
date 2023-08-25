export default function SkillsAndCoursesLoading() {
  return (
    <>
      <section className='mx-auto max-w-website py-6  mb-32 px-6'>
        <div className='max-w-medium overflow-hidden'>
          <h2 className='text-2xl font-semibold mb-4'>Your Skills</h2>
          <div className='flex flex-wrap gap-2 p-4 border border-neutral-200 rounded mb-4'>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>

            <div className='mt-8 flex w-full  gap-x-12'>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full'
                type='text'
                placeholder='Add new skill eg. Content Writing'
              />
              <button className='text-primary px-12 border border-primary rounded whitespace-nowrap '>
                Add Skill
              </button>
            </div>
          </div>
          <h2 className='text-2xl font-semibold mb-4 mt-16'>Your Courses</h2>
          <div className='flex flex-wrap gap-2 p-4 border border-neutral-200 rounded mb-4'>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>
            <div className='animate-pulse rounded-full  bg-slate-200 h-10 w-36'></div>

            <div className='mt-8 flex w-full  gap-x-12'>
              <input
                className='px-5 py-2 outline-none border border-gray-300 rounded w-full'
                type='text'
                placeholder='Add new course eg. Basic Computing'
              />
              <button
                className='text-primary px-12 border border-primary rounded whitespace-nowrap '
                disabled={true}
              >
                Add Course
              </button>
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
