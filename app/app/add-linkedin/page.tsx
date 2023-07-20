export default function Page() {
  return (
    <main className='linkedin-url-page'>
      <div className='max-w-website mx-auto flex flex-col items-center py-24'>
        <h1 className='text-3xl font-medium capitalize mb-10'>
          Add your linkedin profile url
        </h1>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded w-96 mb-8'
          placeholder='https://www.linkedin.com/in/...'
        />
        <button className='bg-primary text-neutral-white text-lg font-medium px-6 py-2 rounded-md'>
          Continue
        </button>
      </div>
    </main>
  )
}
