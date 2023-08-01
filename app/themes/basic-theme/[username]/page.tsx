import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
} from "@/types/interfaces"
import Link from "next/link"

async function getUserInfo(username: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/site?username=${username}`,
    { next: { revalidate: 100 } }
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
  const work_experience = data["experiences"] as IExperience[]
  const education = data["education"] as IEducation[]
  const projects = data["projects"] as IProject[]
  const certificates = data["certificates"] as ICertificate[]

  work_experience.forEach((exp) => {
    if (exp.starts_at) {
      exp.starts_at = new Date(exp.starts_at)
    }
    if (exp.ends_at) {
      exp.ends_at = new Date(exp.ends_at)
    }
  })

  education.forEach((exp) => {
    if (exp.starts_at) {
      exp.starts_at = new Date(exp.starts_at)
    }
    if (exp.ends_at) {
      exp.ends_at = new Date(exp.ends_at)
    }
  })

  work_experience.sort((a, b) => {
    if (a.starts_at && b.starts_at) {
      return b.starts_at.getTime() - a.starts_at.getTime()
    } else if (a.starts_at) {
      return -1
    } else if (b.starts_at) {
      return 1
    } else {
      return 0
    }
  })

  education.sort((a, b) => {
    if (a.starts_at && b.starts_at) {
      return b.starts_at.getTime() - a.starts_at.getTime()
    } else if (a.starts_at) {
      return -1
    } else if (b.starts_at) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <main className='max-w-small-portfolio mx-auto'>
      <section id='hero' className='py-8'>
        <h1 className='text-6xl font-bold mb-4'>
          <div>Hi, I&apos;m</div>
          <div className='text-blue-800 font-black'>{data["occupation"]}</div>
        </h1>
        <div className='flex gap-x-4'>
          <Link href={data["linkedin_url"]} target='_blank'>
            <div className='px-6 py-2 border rounded text-gray-50 bg-blue-800 border-blue-800 font-medium'>
              Linkedin
            </div>
          </Link>
          {data["resume_url"] && (
            <Link href={data["resume_url"]} target='_blank'>
              <div className='px-6 py-2 border rounded text-blue-800 border-blue-800 font-medium'>
                Resume
              </div>
            </Link>
          )}
        </div>
      </section>
      {work_experience.length > 0 && (
        <section id='work-exp' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Work Expierence</h2>
          <div>
            {(work_experience as any[]).map((value, idx) => {
              return (
                <div key={idx} className='mb-4 '>
                  <h3 className='text-lg font-medium mb-2'>{value.title}</h3>
                  <div className='pl-6 border-l-2 border-gray-400'>
                    <p className='font-medium mb-2'>{value.company}</p>
                    <p>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(value.starts_at)}{" "}
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
      {data["skills"].length > 0 && (
        <section id='skills' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Skills</h2>
          <div className='flex flex-wrap gap-x-3 gap-y-2'>
            {(data["skills"] as string[]).map((value, index) => {
              return (
                <p className='bg-blue-200 rounded-full px-4 py-1' key={index}>
                  {value}
                </p>
              )
            })}
          </div>
        </section>
      )}
      {education.length > 0 && (
        <section id='education' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Education</h2>
          <div className=''>
            {education.map((value, index) => {
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
                    }).format(value.starts_at)}{" "}
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
      {projects.length > 0 && (
        <section id='projects' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Projects</h2>
          <div className='flex flex-wrap gap-x-12'>
            {projects.map((value, index) => {
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
      {certificates.length > 0 && (
        <section id='certificates' className='py-8'>
          <h2 className='text-3xl font-semibold mb-4'>Certificates</h2>
          {certificates.map((value, index) => {
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
