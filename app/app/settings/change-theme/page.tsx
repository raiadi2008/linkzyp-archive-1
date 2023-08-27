import Image from "next/image"
import Link from "next/link"

import logo from "@/public/logo.png"
import defaultTheme from "@/public/default-theme.jpg"
import { ITheme } from "@/app/utils/interfaces"

export default async function Page() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/themes`, {
    next: { revalidate: 86400, tags: ["themes"] },
  })
  const data = await resp.json()
  const themes = data as ITheme[]

  return (
    <main className='pb-36'>
      <section className='mx-auto max-w-website px-6'>
        <div className='relative flex justify-start items-center py-6'>
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
      <section className='mx-auto max-w-website px-8 mt-12'>
        <div className='grid grid-cols-2 gap-6 '>
          {themes.map((value, index) => {
            return (
              <div
                key={index}
                className='relative border rounded-lg p-6 max-w-[500px]'
              >
                <div className='relative h-[500px] max-w-[450px]'>
                  <Image src={value.img ?? defaultTheme} alt='' fill />
                </div>
                <div className='mt-6 flex justify-between'>
                  <button className='rounded border border-gray-400 px-6 py-2'>
                    Select
                  </button>
                  <button className='rounded border  border-gray-400 px-6 py-2'>
                    Preview
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
