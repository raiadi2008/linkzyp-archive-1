import { parseSiteDataFromJSON } from "@/app/utils/functions"
import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
} from "@/app/utils/interfaces"
import Link from "next/link"

async function getUserInfo(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/site?username=${username} `,
    { next: { revalidate: 86400, tags: [username] } }
  )
  if (res.ok) {
    const data = await res.json()

    return data
  }
  return null
}

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const data = await getUserInfo(params.username)
  const site = parseSiteDataFromJSON(data)

  return (
    <main className='max-w-small-website mx-auto'>
      <section id='hero' className='py-8'>
        <h1 className='text-6xl font-bold mb-4'>
          <div>Hi, I&apos;m</div>
          <div className='text-blue-800 font-black'>{site?.occupation}</div>
        </h1>
        <div className='flex gap-x-4'>
          {site?.linkedin_url && (
            <Link href={site?.linkedin_url} target='_blank'>
              <div className='px-6 py-2 border rounded text-gray-50 bg-blue-800 border-blue-800 font-medium'>
                Linkedin
              </div>
            </Link>
          )}
          {site?.resume_link && (
            <Link href={site?.resume_link} target='_blank'>
              <div className='px-6 py-2 border rounded text-blue-800 border-blue-800 font-medium'>
                Resume
              </div>
            </Link>
          )}
        </div>
      </section>
      {site?.experiences?.length! > 0 && (
        <section id='work-exp' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Work Expierence</h2>
          <div>
            {site?.experiences!.map((value, idx) => {
              return (
                <div key={idx} className='mb-4 '>
                  <h3 className='text-lg font-medium mb-2'>{value.title}</h3>
                  <div className='pl-6 border-l-2 border-gray-400'>
                    <p className='font-medium mb-2'>{value.company}</p>
                    <p>
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
                    <p>{value.location}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
      {site?.skills?.length! > 0 && (
        <section id='skills' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Skills</h2>
          <div className='flex flex-wrap gap-x-3 gap-y-2'>
            {site?.skills!.map((value, index) => {
              return (
                <p className='bg-blue-200 rounded-full px-4 py-1' key={index}>
                  {value}
                </p>
              )
            })}
          </div>
        </section>
      )}
      {site?.education?.length! > 0 && (
        <section id='education' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Education</h2>
          <div className=''>
            {site?.education!.map((value, index) => {
              return (
                <div
                  key={index}
                  className='py-3 border-b border-gray-400 last:border-none'
                >
                  <h3 className='text-xl font-medium'>{value.school}</h3>
                  <p className='text-sm mb-2'>
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
                  <p className='font-semibold'>{value.degree_name}</p>
                  <p>{value.field_of_study}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}
      {site?.projects?.length! > 0 && (
        <section id='projects' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Projects</h2>
          <div className='flex flex-wrap gap-x-12'>
            {site?.projects?.map((value, index) => {
              if (index < 2) {
                return (
                  <div
                    key={index}
                    className='w-72 h-96 relative border rounded-md border-gray-400 p-4'
                  >
                    <h3 className='font-medium mb-6 text-xl'>{value.title}</h3>
                    <p className='text-gray-500'>{value.description}</p>
                    {value.url && (
                      <Link href={value.url} target='_blank'>
                        <div className='px-6 py-2 border rounded text-gray-50 bg-blue-800 border-blue-800 font-medium absolute bottom-4 right-4'>
                          View Project
                        </div>
                      </Link>
                    )}
                  </div>
                )
              }
            })}
          </div>
        </section>
      )}
      {site?.certificates?.length! > 0 && (
        <section id='certificates' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Certificates</h2>
          {site?.certificates?.map((value, index) => {
            return (
              <Link href={value.url ?? "#"} key={index}>
                <p>
                  {value.name} issued by {value.authority}
                </p>
              </Link>
            )
          })}
        </section>
      )}
      <section id='footer'></section>
    </main>
  )
}
