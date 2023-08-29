import { Montserrat, Noto_Sans, Poppins } from "next/font/google"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faGithub,
  faMedium,
  faDribbble,
  faBlogger,
} from "@fortawesome/free-brands-svg-icons"

import getUserInfo from "@/app/themes/get_user_info"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import Link from "next/link"
import officeBuilding from "@/public/icons/office-building.png"
import JobPopup from "./job-popup"
import hireMeImage from "@/public/themes-heros/notion-hire-me.svg"

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
  const navbar: JSX.Element[] = []
  if (site?.experiences?.length! > 0)
    navbar.push(<Link href='#experience'>Work Experience</Link>)
  if (site?.education?.length! > 0)
    navbar.push(<Link href='#education'>Education</Link>)
  if (site?.projects?.length! > 0)
    navbar.push(<Link href='#projects'>Projects</Link>)
  if (site?.skills?.length! > 0) navbar.push(<Link href='#skills'>Skills</Link>)

  return (
    <main className={`${poppins.className} text-black`}>
      <section id='navbar' className='px-6 border-b border-gray-500'>
        <div className='max-w-website mx-auto py-4 flex justify-between items-center md:justify-end '>
          <div className='flex gap-x-12 font-normal md:hidden'>
            {navbar.map((value) => value)}
          </div>
          <div className=''>
            {site?.linkedin_url && (
              <Link href={site.linkedin_url} target='_blank'>
                <div className='bg-black border-2 text-white px-8 py-3 rounded-lg border-black'>
                  Connect
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section
        id='hero'
        className='px-6 max-w-website mx-auto py-28 bg-notion-theme-image bg-no-repeat bg-contain bg-right '
      >
        <div className='flex flex-col items-center'>
          <h1 className='text-7xl text-center font-bold leading-tight text-black xl:text-6xl sxl:text-5xl lg:text-4xl'>
            <span className='block'>Hello!, I am {site?.first_name}</span>
            <span className='block'>
              I am a{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 font-outline-4 md:bg-gradient-to-r md:from-black md:to-black md:font-outline-0'>
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
          <div className='flex gap-x-12 xxl:gap-x-4 sxl:flex-col'>
            <div className='w-1/4 mx-auto sxl:w-full'>
              <h2 className='text-2xl font-semibold'>Work Experience</h2>
              <p className='text-sm mt-4 text-gray-500'>
                Read all about my work experience and how I have contributed at
                my current and previous companies in their growth.
              </p>
            </div>
            <div className='w-3/4 mx-auto grid grid-cols-2 gap-4 sxl:mt-6 sxl:w-full md:grid-cols-1'>
              {site?.experiences?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='border-2 rounded p-4 border-gray-600 h-96 relative overflow-hidden'
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

      {site?.skills?.length! > 0 && (
        <section id='skills' className='max-w-website mx-auto py-24 px-8'>
          <div className='flex gap-12 lg:flex-col '>
            <div className='w-1/4 lg:w-full'>
              <h2 className='text-2xl font-semibold'>My Skills</h2>
              <p className='text-sm font-light mt-6'>
                Here are some skills that I have learned throughout my career
                and learning
              </p>
            </div>

            <div className='w-3/4 flex flex-row flex-wrap justify-start items-end gap-4 lg:w-full'>
              {site?.skills?.map((value, index) => {
                return (
                  <p
                    key={index}
                    className='px-6 py-2 border rounded border-black'
                  >
                    {value}
                  </p>
                )
              })}
            </div>
          </div>
        </section>
      )}
      {site?.courses?.length! > 0 && (
        <section id='courses' className='max-w-website mx-auto py-24 px-8'>
          <div className='flex gap-12 lg:flex-col'>
            <div className='w-1/4 lg:w-full'>
              <h2 className=' text-2xl font-semibold'>My Courses</h2>
              <p className='text-sm font-light mt-6'>
                Here are some courses that I have taken throughout my
                educational journey
              </p>
            </div>

            <div className='w-3/4 flex flex-row flex-wrap justify-start items-end gap-4 lg:w-full'>
              {site?.courses?.map((value, index) => {
                return (
                  <p
                    key={index}
                    className='px-6 py-2 border rounded border-black'
                  >
                    {value}
                  </p>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {site?.education?.length! > 0 && (
        <section id='education' className='max-w-website mx-auto py-24 px-8'>
          <div className='flex gap-12 lg:flex-col'>
            <div className='w-1/4 lg:w-full'>
              <h2 className=' text-2xl font-semibold'>Education</h2>
              <p className='text-sm font-light mt-6'>
                Here are schools and colleges that I have attended along with my
                degrees
              </p>
            </div>
            <div className='flex flex-col gap-6 flex-1'>
              {site?.education?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='px-8 py-4 border border-black rounded-lg'
                  >
                    <p className='text-lg font-semibold '>{value.school}</p>
                    <p className='text-gray-600 '>
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
                    <p className='mt-2 '>
                      {value.degree_name} in {value.field_of_study}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      {site?.projects?.length! > 0 && (
        <section id='projects' className='max-w-website mx-auto py-24 px-8'>
          <div className='flex gap-12 lg:flex-col'>
            <div className='w-1/4 lg:w-full'>
              <h2 className=' text-2xl font-semibold'>Projects</h2>
              <p className='text-sm font-light mt-6'>
                Here are a few projects that I have worked on so far
              </p>
            </div>
            <div className='flex flex-col  flex-1'>
              {site?.projects?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className=' py-8 first:pt-0 border-b border-gray-600 last:border-none'
                  >
                    <p className='font-medium text-lg'>{value.title}</p>
                    <p className='font-light text-gray-500'>
                      {value.description?.split("\n").map((value, index) => (
                        <span className='block' key={index}>
                          {value}
                        </span>
                      ))}
                    </p>
                    {value.url && (
                      <Link href={value.url} target='_blank'>
                        <div className='border border-black rounded px-6 py-2 inline-block mt-6'>
                          View
                        </div>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      <section id='hire-me' className='max-w-website mx-auto py-8'>
        <div className='flex bg-black rounded-lg px-20 py-20 justify-between xl:rounded-none'>
          <div className=''>
            <h2 className='text-white text-4xl font-black'>
              <span className='block lg:inline'>Would you like to offer</span>{" "}
              me a role?
            </h2>
            <Link
              href={site?.hire_me ?? site?.linkedin_url ?? ""}
              target='_blank'
            >
              <div className='bg-white text-black px-8 py-4 rounded-lg font-medium mt-12 inline-block'>
                Hire Me
              </div>
            </Link>
          </div>
          <Image src={hireMeImage} alt='' className='w-1/3 xl:hidden' />
        </div>
      </section>
      {site?.faqs?.length! > 0 && (
        <section id='courses' className='max-w-website mx-auto py-24 px-8'>
          <div className='flex gap-12 lg:flex-col'>
            <div className='w-1/4 lg:w-full'>
              <h2 className=' text-2xl font-semibold'>FAQs</h2>
              <p className='text-sm font-light mt-2'>
                Frequently Asked Questions
              </p>
            </div>
            <div className='w-3/4 flex flex-col gap-8 lg:w-full'>
              {site?.faqs?.map((value, index) => {
                return (
                  <div key={index}>
                    <p className='mb-2 font-medium'>{value.question}</p>
                    <p className='font-light text-gray-700 text-sm'>
                      {value.answer}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      <section id='footer' className='bg-black'>
        <div className='max-w-website mx-auto py-16 px-8'>
          <div>
            <h2 className='text-white text-6xl font-black'>Say Hi!</h2>
            <div className='mt-8 flex gap-x-8'>
              {site?.instagram_url && (
                <Link href={site.instagram_url} target='_blank'>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className='text-white h-8 w-8'
                  />
                </Link>
              )}
              {site?.linkedin_url && (
                <Link href={site.linkedin_url} target='_blank'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className='text-white h-8 w-8'
                  />
                </Link>
              )}
              {site?.twitter_url && (
                <Link href={site.twitter_url} target='_blank'>
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className='text-white h-8 w-8'
                  />
                </Link>
              )}
              {site?.youtube_url && (
                <Link href={site.youtube_url} target='_blank'>
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className='text-white h-8 w-8'
                  />
                </Link>
              )}
            </div>
          </div>
          <div className='mt-32 flex justify-between'>
            <div>
              <h2 className='text-white text-xl font-black'>
                Check out my work here
              </h2>
              <div className='flex flex-col gap-y-4 mt-8'>
                {site?.github_url && (
                  <Link
                    href={site.github_url}
                    target='_blank'
                    className='flex items-center gap-x-4'
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className='text-white h-8 w-8'
                    />
                    <span className='text-white'>Github</span>
                  </Link>
                )}
                {site?.medium_url && (
                  <Link
                    href={site.medium_url}
                    target='_blank'
                    className='flex items-center gap-x-4'
                  >
                    <FontAwesomeIcon
                      icon={faMedium}
                      className='text-white h-8 w-8'
                    />
                    <span className='text-white'>Medium</span>
                  </Link>
                )}
                {site?.dribbble_url && (
                  <Link
                    href={site.dribbble_url}
                    target='_blank'
                    className='flex items-center gap-x-4'
                  >
                    <FontAwesomeIcon
                      icon={faDribbble}
                      className='text-white h-8 w-8'
                    />
                    <span className='text-white'>Dribbble</span>
                  </Link>
                )}
                {site?.publication && (
                  <Link
                    href={site.publication}
                    target='_blank'
                    className='flex items-center gap-x-4'
                  >
                    <FontAwesomeIcon
                      icon={faBlogger}
                      className='text-white h-8 w-8'
                    />
                    <span className='text-white'>Publication</span>
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h2 className='text-white text-xl font-black'>Quick Links</h2>
              <div className='flex flex-col gap-y-4 mt-8 text-white'>
                {navbar.map((value) => {
                  return value
                })}
              </div>
            </div>
            <div className='lg:hidden'>
              <h2 className='text-white text-3xl font-black'>
                Liked my work so far? <span className='block'>Hire me</span>
              </h2>
              <Link
                href={site?.hire_me ?? site?.linkedin_url ?? ""}
                target='_blank'
              >
                <div className='bg-white text-black px-8 py-4 rounded-lg font-medium mt-12 inline-block'>
                  Hire Me
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
