export default function PremiumPopup() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 z-10'>
      <div className=' bg-white rounded-lg p-4 mx-auto mt-20 w-112'>
        <h4 className='text-sm font-black mb-5 text-black'>
          Boost your career for less than a cup of coffee
        </h4>
        <h3 className='text-6xl font-black text-black'>
          $5<span className='text-xl font-medium text-gray-700'> / month</span>
        </h3>

        <h6 className='mt-6 mb-3 font-semibold text-xl text-black'>
          Premium Benifits
        </h6>
        <ul className='text-sm font-medium text-gray-500'>
          <li>Premium SSL</li>
          <li>Custom domains and usernames</li>
          <li>Premium Themes</li>
          <li>Unlimited hosting storage</li>
          <li>Lightning fast loading speeds</li>
        </ul>
        <div className='mt-12 flex justify-end'>
          <button className='font-bold bg-black text-yellow-500 px-6 py-3 rounded-lg'>
            Go Premium
          </button>
        </div>
      </div>
    </div>
  )
}
