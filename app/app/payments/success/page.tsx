import Link from "next/link"

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Page() {
  return (
    <main className='w-fit mx-auto mt-24'>
      <h1 className='text-xl font-semibold text-black mb-4'>
        You have succesfully subscribed to LINKZYP PREMIUM
      </h1>
      <div className='mt-12 flex justify-center'>
        <FontAwesomeIcon
          icon={faCheckCircle}
          color='green'
          className='w-24 h-24'
        />
      </div>
      <div className='flex gap-x-12 mt-12 justify-center'>
        <Link href='/app/settings'>
          <button className='px-6 py-3 rounded-md text-yellow-600 font-semibold bg-black'>
            Use Premium Features
          </button>
        </Link>
      </div>
    </main>
  )
}
