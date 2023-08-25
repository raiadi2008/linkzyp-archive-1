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

import getUserInfo from "@/app/themes/get_user_info"
import { parseSiteDataFromJSON } from "@/app/utils/functions"
import Link from "next/link"
import officeBuilding from "@/public/icons/office-building.png"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})
const randomBgColors = ["blue-100", "red-100", "green-100", "amber-100"]

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
      <section className='max-w-website mx-auto py-6' id='navbar'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-x-8 items-center'>
            <div>{Logo}</div>
            <div className='flex gap-x-8 font-semibold text-[15px] '>
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
        <div className='flex mx-auto max-w-website py-24 items-center'>
          <div className='w-3/5'>
            <h1 className='font-black text-7xl text-white font-outline-2 leading-tight'>
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
          <div className='w-2/5'>
            <div className='flex flex-col justify-center items-center relative'>
              <Image src={mac} alt='' className='relative h-96' />
              <Image src={keyboard} alt='' className='relative h-24 mt-4' />
            </div>
          </div>
        </div>
      </section>
      {site?.experiences?.length! > 0 && (
        <section className='mx-auto max-w-website py-20' id='experience'>
          <h2 className='text-center text-4xl font-black'>
            My Work Experience
          </h2>

          <div className='grid grid-cols-2 gap-16 grice mt-16'>
            {site?.experiences?.map((value, index) => {
              return (
                <div key={index} className='w-112 h-112 mx-auto relative'>
                  <div className='absolute top-3 w-112 h-112 left-3 rounded-xl  bg-gray-800'></div>
                  <div
                    className={`relative rounded-xl p-6 bg-${
                      randomBgColors[index % randomBgColors.length]
                    }  border-2 border-black w-112 h-112`}
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
                    <p className='mt-6 h-96 overflow-scroll'>
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
      {site?.education?.length! > 0 && (
        <section className='bg-white py-20' id='education'>
          <div className='mx-auto max-w-website '>
            <h2 className='text-center text-4xl font-black'>
              My Educational Background
            </h2>
            <div className='grid grid-cols-2 gap-16 grice mt-16'>
              {site?.education?.map((value, index) => {
                return (
                  <div key={index} className='w-112 h-52 mx-auto relative'>
                    <div className='absolute top-3 w-112 h-52 left-3 rounded-xl  bg-gray-800'></div>
                    <div className='relative rounded-xl p-6 bg-zinc-50 border-2 border-black w-112 h-52'>
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
    </main>
  )
}
