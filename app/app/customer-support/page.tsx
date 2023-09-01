import Link from "next/link"
import Image from "next/image"
import logo from "@/public/logo.png"

export default function Page() {
  return (
    <main className=''>
      <section className='mx-auto max-w-website px-6'>
        <div className='relative flex justify-between items-center py-6'>
          <Link href='/'>
            <div className='relative flex gap-x-2 items-center'>
              <Image
                src={logo}
                alt='logo'
                className='w-10 h-10 md:w-8 md:h-10'
              />
              <h2 className='text-xl text-neutral-dark font-medium md:text-lg'>
                Linkzyp
              </h2>
            </div>
          </Link>
        </div>
      </section>
      <section className='w-1/2 mx-auto text-sm py-12 px-8 md:w-full'>
        For any query write us an email linkzyp.official@gmail.com
      </section>
    </main>
  )
}
