import Image from "next/image"
import Link from "next/link"

import logo from "@/public/logo.png"
import portfolioSS from "@/public/portfolio-ss.svg"

// confetis import
import confetti1 from "@/public/confetti-1.png"
import confetti2 from "@/public/confetti-2.png"
import confetti3 from "@/public/confetti-3.png"
import confetti4 from "@/public/confetti-4.png"
import confetti5 from "@/public/confetti-5.png"
import confetti6 from "@/public/confetti-6.png"
import confetti7 from "@/public/confetti-7.png"

export default function Home() {
  return (
    <main className=''>
      <section id='navbar' className='px-4 py-4'>
        <div className='max-w-website relative mx-auto flex justify-between items-center'>
          <Link href={"/"}>
            <div className='relative flex gap-x-2 items-center'>
              <Image src={logo} alt='logo' className='w-12 h-12' />
              <h2 className='text-xl text-neutral-dark font-medium'>Linkzyp</h2>
            </div>
          </Link>
          <div className='flex gap-x-8 items-center'>
            <Link href='/app/login'>
              <div className='rounded-full border-2 border-primary px-6 py-2 font-medium sm:hidden'>
                Get Started
              </div>
            </Link>
            <Link href='/app/login'>
              <div className='text-neutral-white border-2 border-primary bg-primary rounded-full px-6 py-2 font-medium'>
                Login
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section id='hero' className='pt-24 pb-8 px-4'>
        <div className='max-w-website relative mx-auto flex flex-col items-center gap-y-12'>
          <h1 className='text-center text-7xl font-black tracking-wide xl:text-5xl md:text-4xl xs:text-3xl'>
            <div>Convert Your Linkedin</div>
            <div>Into Job Landing </div>
            <div>Portfolios</div>
          </h1>
          <Link href='/app/login'>
            <div className='text-neutral-white border-2 text-xl border-primary bg-primary rounded-full px-6 py-2 font-medium'>
              Get Started
            </div>
          </Link>
          <div className='w-2/3 mx-auto sm:w-full'>
            <Image src={portfolioSS} alt='' className='' />
          </div>
        </div>
      </section>
      <section id='why'>
        <div className='max-w-website mx-auto relative flex flex-col items-center gap-y-8 px-4'>
          <div className='opacity-50 -z-50'>
            <Image
              src={confetti1}
              alt=''
              className='absolute left-10 top-24 h-11 w-11'
            />
            <Image
              src={confetti2}
              alt=''
              className='absolute right-10 top-36 h-11 w-11'
            />
            <Image
              src={confetti3}
              alt=''
              className='absolute right-72 top-12 h-11 w-11'
            />
            <Image
              src={confetti4}
              alt=''
              className='absolute left-72 bottom-12 h-11 w-11'
            />
            <Image
              src={confetti5}
              alt=''
              className='absolute right-72 bottom-16 h-11 w-11'
            />
            <Image
              src={confetti6}
              alt=''
              className='absolute right-48 bottom-0 h-11 w-11'
            />
            <Image
              src={confetti7}
              alt=''
              className='absolute left-40 top-72 h-11 w-11'
            />
          </div>
          <div className='w-96 lg:w-72'>
            <h2 className='text-3xl font-semibold mb-3 lg:text-2xl'>
              Professional Templates
            </h2>
            <p className='text-gray-500 text-lg font-medium lg:text-base'>
              Choose from a variety of professional templates to get started
              quickly. Change styles and colors to suit your needs.
            </p>
          </div>
          <div className='w-96 lg:w-72'>
            <h2 className='text-3xl font-semibold mb-3 lg:text-2xl'>
              Easy To Deploy
            </h2>
            <p className='text-gray-500 text-lg font-medium lg:text-base'>
              With Linkzyp, you can deploy your portfolio instantly. No need to
              own a server or maintain the deployments. We will do everything
              for you.
            </p>
          </div>
          <div className='w-96 lg:w-72'>
            <h2 className='text-3xl font-semibold mb-3 lg:text-2xl'>
              Share Anywhere
            </h2>
            <p className='text-gray-500 text-lg font-medium lg:text-base'>
              You can claim a username and get a shareable url to your
              portfolio.
            </p>
          </div>
        </div>
      </section>
      <section id='footer' className='bg-neutral-dark mt-8'>
        <div className='max-w-website mx-auto relative px-4 py-16 flex flex-col items-center'>
          <h2 className='text-neutral-white text-4xl font-semibold capitalize lg:text-3xl text-center'>
            Build your portfolio today
          </h2>
          <Link href='/app/login'>
            <div className='text-primary bg-neutral-white border-2 text-xl rounded-full px-6 py-2 font-medium mt-8 lg:text-lg'>
              Get Started
            </div>
          </Link>
        </div>
      </section>
    </main>
  )
}
