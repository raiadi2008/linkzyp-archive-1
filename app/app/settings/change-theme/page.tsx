import Image from "next/image"
import Link from "next/link"

import logo from "@/public/logo.png"
import defaultTheme from "@/public/default-theme.jpg"
import { ITheme } from "@/app/utils/interfaces"
import { SaveButton } from "./save-button"

async function getAllThemes() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/themes`, {
    next: { revalidate: 60, tags: ["all-themes"] },
  })
  const data = await resp.json()
  return data["themes"] as ITheme[]
}

export default async function Page() {
  const themes = await getAllThemes()

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
        <div className='grid grid-cols-3 gap-6 sxl:grid-cols-2 sm:grid-cols-1'>
          {themes.map((value, index) => {
            if (value.type === "PREMIUM")
              return (
                <div key={index} className='relative border rounded-lg p-6'>
                  <h3 className='mb-4 font-semibold text-lg'>{value.name}</h3>
                  <div className='relative'>
                    <Image
                      src={value.img ?? defaultTheme}
                      alt=''
                      width={450}
                      height={500}
                      layout='responsive'
                      objectFit='cover'
                    />
                  </div>
                  <div className='mt-6 flex justify-between'>
                    <SaveButton theme_id={value.id} />
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
