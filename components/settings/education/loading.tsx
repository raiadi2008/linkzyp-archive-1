export default function EducationLoading() {
  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium'>
          <div className='my-12 relative pb-14'>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='animate-pulse rounded  bg-slate-200 h-9 w-full mb-4'></div>
            <div className='flex gap-x-6 items-center mb-4'>
              <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>

              <div className='animate-pulse rounded  bg-slate-200 h-9 flex-1 '></div>
            </div>
            <button
              className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
              disabled={true}
            >
              remove education
            </button>
          </div>
          <button
            className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
            disabled={true}
          >
            + Add Another Education
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium py-8 flex gap-x-6 justify-end'>
            <button
              disabled={true}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              disabled={true}
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
