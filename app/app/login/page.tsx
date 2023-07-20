import Link from "next/link"
import Image from "next/image"

import logo from "@/public/logo.png"
import googleIcon from "@/public/google-icon.png"
import microsoftIcon from "@/public/microsoft-icon.png"

export default function Page() {
  return (
    <main className='' id='login-page'>
      <div className='w-96 mx-auto py-16 px-6 gap-y-8 flex flex-col items-center'>
        <Link href={"/"}>
          <div className='relative flex gap-x-2 items-center'>
            <Image src={logo} alt='logo' className='w-12 h-12' />
            {/* <h2 className='text-xl text-neutral-dark font-medium'>Linkzyp</h2> */}
          </div>
        </Link>
        <h1 className='font-semibold text-3xl'>Welcome Back!</h1>
        <button className=' flex gap-x-4 py-2 border border-neutral-400 rounded items-center justify-center w-full'>
          <Image src={googleIcon} alt='' className='h-9 w-9' />
          <p className='text-lg font-medium'>Signin with Google</p>
        </button>
        <button className=' flex gap-x-4 py-2 border border-neutral-400 rounded items-center justify-center w-full'>
          <Image src={microsoftIcon} alt='' className='h-9 w-9' />
          <p className='text-lg font-medium'>Signin with Microsoft</p>
        </button>
      </div>
    </main>
  )
}
