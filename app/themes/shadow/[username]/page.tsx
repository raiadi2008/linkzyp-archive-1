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
import mac from "@/public/themes-heros/Mac.svg"
import keyboard from "@/public/themes-heros/Keyboard.svg"
import megaphone from "@/public/icons/megaphone.svg"

import getUserInfo from "@/app/themes/get_user_info"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import Link from "next/link"
import officeBuilding from "@/public/icons/office-building.png"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const randomBgColors = [
    "bg-blue-100",
    "bg-red-100",
    "bg-green-100",
    "bg-amber-100",
  ]
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
  const nameInitials = `${site?.first_name ? site.first_name[0] : ""}${
    site?.last_name ? site.last_name[0] : ""
  }`
  const Logo = (
    <span className='rounded-full bg-black p-3 font-bold text-white'>
      {nameInitials}
    </span>
  )

  return (
    <main className='text-black bg-orange-50 '>
      <section className='max-w-website mx-auto py-6 px-8' id='navbar'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-x-8 items-center'>
            <div>{Logo}</div>
            <div className='flex gap-x-8 font-semibold text-[15px] md:hidden'>
              {navbar.map((value) => value)}
            </div>
          </div>
          <div className=''>
            <Link
              href={
                site?.hire_me ?? site?.linkedin_url ?? site?.resume_link ?? ""
              }
              target='_blank'
            >
              <button className='relative'>
                <span className='absolute h-12 w-28 bg-white left-2 top-2 inline-block z-0 rounded border-2 border-blue-700'></span>
                <span className='inline-block py-3 px-6  bg-blue-700 h-12 w-28 text-white font-semibold relative rounded '>
                  Hire Me
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section id='hero' className='bg-shadow-theme-image'>
        <div className='flex mx-auto max-w-website py-24 items-center px-8'>
          <div className='w-3/5 sxl:mx-auto sxl:w-full'>
            <h1 className='font-black text-7xl text-white font-outline-2 leading-tight xxl:text-6xl  sxl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl'>
              <span className='block'>Hey! {site?.first_name} </span>
              <span className='block'>this side. I am </span>
              <span className='block'>{site?.occupation}</span>
            </h1>
            <div className='mt-8'>
              {site?.linkedin_url && (
                <Link href={site?.linkedin_url} target='_blank'>
                  <button className='px-6 py-3 border-2 border-black bg-black text-white rounded-full'>
                    Connect With Me &rarr;
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className='w-2/5 sxl:hidden'>
            <div className='flex flex-col justify-center items-center relative'>
              <Image src={mac} alt='' className='relative h-96' />
              <Image src={keyboard} alt='' className='relative h-24 mt-4' />
            </div>
          </div>
        </div>
      </section>
      {site?.experiences?.length! > 0 && (
        <section
          className='mx-auto max-w-website py-20 px-8 sxl:px-16 md:px-4'
          id='experience'
        >
          <h2 className='text-center text-4xl font-black md:text-3xl mdfont-bold'>
            My Work Experience
          </h2>

          <div className='grid grid-cols-2 gap-16 mt-16 xxl:gap-8 sxl:grid-cols-1'>
            {site?.experiences?.map((value, index) => {
              const color = randomBgColors[index % randomBgColors.length]
              return (
                <div
                  key={index}
                  className='w-112 h-112 mx-auto relative xxl:w-102 xl:w-96 sxl:w-full'
                >
                  <div className='absolute top-3 w-112 h-112 left-3 rounded-xl  bg-gray-800 xxl:w-102 xl:w-96 sxl:w-full md:top-2 md:left-2'></div>
                  <div
                    className={`relative rounded-xl p-6 ${color}  border-2 border-black w-112 h-112 z-10 xxl:w-102 xl:w-96 sxl:w-full`}
                  >
                    <div className='flex gap-x-6'>
                      <Image
                        className=''
                        src={value.logo ?? officeBuilding}
                        alt=''
                        width={72}
                        height={72}
                      />
                      <div>
                        <p>{value.title}</p>
                        <p>{value.company}</p>
                        {
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
                        }
                      </div>
                    </div>
                    <div className='overflow-hidden h-96'>
                      <p className='mt-6 mb-4 h-96 overflow-scroll no-scrollbar'>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
      {site?.education?.length! > 0 && (
        <section
          className='bg-white py-20 px-8 sxl:px-16 md:px-4'
          id='education'
        >
          <div className='mx-auto max-w-website '>
            <h2 className='text-center text-4xl font-black md:text-3xl mdfont-bold'>
              My Educational Background
            </h2>
            <div className='grid grid-cols-2 gap-16 mt-16 xxl:gap-8 sxl:grid-cols-1'>
              {site?.education?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='w-112 h-52 mx-auto relative xxl:w-102 xl:w-96 sxl:w-full'
                  >
                    <div className='absolute top-3 w-112 h-52 left-3 rounded-xl  bg-gray-800 xxl:w-102 xl:w-96 sxl:w-full'></div>
                    <div className='relative rounded-xl p-6 bg-zinc-50 border-2 border-black w-112 h-52 xxl:w-102 xl:w-96 sxl:w-full'>
                      <div className='flex gap-x-6'>
                        <div>
                          <p className='font-bold text-lg'>{value.school}</p>
                          <p className='font-medium'>{value.degree_name}</p>
                          {
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
                          }
                        </div>
                      </div>
                      <p className='italic font-semibold mt-5 text-green-700'>
                        Graduated in {value.field_of_study}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      {site?.projects?.length! > 0 && (
        <section className='py-20 px-8 sxl:px-16 md:px-4' id='projects'>
          <div className='mx-auto max-w-website'>
            <h2 className='text-center text-4xl font-black md:text-3xl mdfont-bold'>
              My Projects
            </h2>
            <div className='grid grid-cols-2 gap-16 mt-16 xxl:gap-8 sxl:grid-cols-1'>
              {site?.projects?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='w-112 h-72 mx-auto relative xxl:w-102 xl:w-96 sxl:w-full'
                  >
                    <div className='absolute top-3 w-112 h-96 left-3 rounded-xl  bg-gray-800 xxl:w-102 xl:w-96 sxl:w-full'></div>
                    <div
                      className={`relative rounded-xl p-6 ${
                        randomBgColors[index % randomBgColors.length]
                      } border-2 border-black w-112 h-96 xxl:w-102 xl:w-96 sxl:w-full`}
                    >
                      <p className='font-bold text-lg'>{value.title}</p>
                      <div className='h-64 overflow-hidden'>
                        <p className='mt-3 h-60 py-4 overflow-scroll no-scrollbar'>
                          {value.description}
                        </p>
                      </div>
                      {value.url && (
                        <Link href={value.url} target='_blank'>
                          <button className='absolute bottom-6 right-6'>
                            <span className='absolute h-12 w-28 bg-white left-2 top-2 inline-block z-0 rounded border-2 border-black'></span>
                            <span className='inline-block py-3 px-6  bg-white text-black h-12 w-28 border-2 border-black font-semibold relative rounded '>
                              View
                            </span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      {site?.skills?.length! + site?.courses?.length! > 0 && (
        <section
          className='py-20 mx-auto max-w-website px-8 md:px-4'
          id='skills-and-courses'
        >
          <div>
            <h2 className='text-center text-4xl font-black md:text-3xl mdfont-bold'>
              My Skills and Courses
            </h2>
            <div className='flex flex-col gap-y-12 mt-16'>
              {site?.skills?.length! > 0 && (
                <div className='flex md:flex-col'>
                  <h3 className='w-1/4 py-6 text-3xl font-semibold md:w-full md:text-2xl'>
                    Skills
                  </h3>
                  <div
                    id='skills'
                    className='flex gap-6 w-3/4 flex-wrap justify-start items-center lg:gap-3 md:w-full'
                  >
                    {site?.skills?.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className='px-6 py-3 border-2 border-black rounded bg-white md:px-4 md:py-2'
                        >
                          {value}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {site?.courses?.length! > 0 && (
                <div className='flex md:flex-col mt-8 md:w-full'>
                  <h3 className='w-1/4 py-6 text-3xl font-semibold md:w-full md:text-2xl'>
                    Courses
                  </h3>
                  <div
                    id='courses'
                    className='flex gap-6 w-3/4 flex-wrap justify-start items-center lg:gap-3 md:w-full'
                  >
                    {site?.courses?.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className='px-6 py-3 border-2 border-black rounded bg-white md:px-4 md:py-2'
                        >
                          {value}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <section
        className='mx-auto max-w-website bg-shadow-theme-image rounded-xl xxl:rounded-none '
        id='hire-me'
      >
        <div className='py-20 px-16 flex justify-between md:px-8'>
          <div className='flex flex-col justify-center'>
            <p className='text-4xl font-black text-white sxl:text-5xl md:text-4xl'>
              Did you like my work?
            </p>
            <p className='text-4xl font-black text-white sxl:text-5xl'>
              Hire me.
            </p>
            <Link
              href={
                site?.hire_me ?? site?.linkedin_url ?? site?.resume_link ?? ""
              }
              target='_blank'
            >
              <button className='relative mt-8'>
                <span className='absolute h-12 w-28 bg-white left-2 top-2 inline-block z-0 rounded border-2 border-black'></span>
                <span className='inline-block py-3 px-6  bg-black h-12 w-28 text-white font-semibold relative rounded '>
                  Hire Me
                </span>
              </button>
            </Link>
          </div>
          <div className='sxl:hidden'>
            <Image src={megaphone} alt='' height={360} width={360} />
          </div>
        </div>
      </section>
      {site?.faqs?.length! > 0 && (
        <section id='courses' className='max-w-website mx-auto py-24'>
          <h2 className='text-center text-4xl font-black md:text-3xl mdfont-bold'>
            FAQs
          </h2>
          <p className='mt-4 text-center'>Frequently Asked Questions</p>
          <div className='w-3/4 flex flex-col gap-8 mt-8 mx-auto'>
            {site?.faqs?.map((value, index) => {
              return (
                <div key={index}>
                  <p className='mb-2 font-semibold text-lg'>{value.question}</p>
                  <p className='font-light text-gray-700 text-sm'>
                    {value.answer}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      )}
      <section id='footer' className=''>
        <div className='max-w-website mx-auto py-16 bg-shadow-theme-image px-8 rounded-t-3xl'>
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
          <div className='mt-32 flex gap-x-4 justify-between'>
            <div>
              <h2 className='text-white text-xl font-black md:font-bold'>
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
              <h2 className='text-white text-xl font-black md:font-bold'>
                Quick Links
              </h2>
              <div className='flex flex-col gap-y-4 mt-8 text-white'>
                {navbar.map((value) => {
                  return value
                })}
              </div>
            </div>
            <div className='lg:hidden'>
              <h2 className='text-white text-3xl font-black md:font-bold'>
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
