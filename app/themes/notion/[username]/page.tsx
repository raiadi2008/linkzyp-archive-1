import { Montserrat, Noto_Sans, Poppins } from "next/font/google"
import Image from "next/image"

import getUserInfo from "@/app/themes/get_user_info"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import Link from "next/link"
import officeBuilding from "@/public/icons/office-building.png"
import JobPopup from "./job-popup"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const data = await getUserInfo(params.username)
  const site = parseSiteDataFromJSON(data)

  return (
    <main className={`${poppins.className} text-black`}>
      <section
        id='hero'
        className='px-6 max-w-website mx-auto py-28 bg-notion-theme-image bg-no-repeat bg-contain bg-right '
      >
        <div className='flex flex-col items-center'>
          <h1 className='text-7xl text-center font-bold leading-tight text-black'>
            <span className='block'>Hello!, I am {site?.first_name}</span>
            <span className='block'>
              I am a{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 font-outline-4'>
                {site?.occupation}
              </span>
            </span>
          </h1>

          <div className='flex gap-x-12 mt-16 '>
            {site?.linkedin_url && (
              <Link href={site.linkedin_url} target='_blank'>
                <div className='bg-black border-2 text-white px-8 py-3 rounded-lg border-black'>
                  Connect
                </div>
              </Link>
            )}
            {site?.resume_link && (
              <Link href={site.resume_link} target='_blank'>
                <div className='border-2 text-black px-8 py-3 rounded-lg border-black'>
                  Resume
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      {site?.experiences?.length! > 0 && (
        <section id='experience' className='px-6 max-w-website mx-auto py-28'>
          <div className='flex gap-x-12'>
            <div className='w-1/4'>
              <h2 className='text-2xl font-semibold'>Work Experience</h2>
              <p className='text-sm mt-4 text-gray-500'>
                Read all about my work experience and how I have contributed at
                my current and previous companies in their growth.
              </p>
            </div>
            <div className='w-3/4 flex flex-wrap gap-4'>
              {site?.experiences?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='border-2 rounded p-4 w-96 border-gray-600 h-96 relative overflow-hidden'
                  >
                    <div className='flex items-center gap-x-8 '>
                      <Image
                        src={value.logo ?? officeBuilding}
                        alt=''
                        width={60}
                        height={60}
                      />
                      <div>
                        <p className='font-medium'>{value.title}</p>
                        <p className='text-gray-600'>{value.company}</p>
                        <p className='text-gray-600 text-sm mt-2'>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                          }).format(value.starts_at!)}{" "}
                          -{" "}
                          {value.ends_at
                            ? new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                              }).format(value.ends_at)
                            : "Present"}
                        </p>
                      </div>
                    </div>
                    <p className='ml-12 mt-5 text-sm text-gray-400'>
                      {value.description?.slice(0, 150)} ...
                    </p>
                    {value.description && (
                      <div className='absolute w-full left-0 bottom-0 py-3 px-3 flex justify-end'>
                        <JobPopup
                          logo={value.logo}
                          title={value.title!}
                          starts_at={value.starts_at}
                          ends_at={value.ends_at}
                          subTitle={`My roles and responsiblities at ${value.company}`}
                          content={value.description}
                          company={value.company}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
